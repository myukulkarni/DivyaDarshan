# myapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
import json
from .models import DarshanUser

class RegisterView(APIView):
    def post(self, request):
        try:
            data = request.data
            full_name = data.get("full_name")
            email = data.get("email")
            phone = data.get("phone")
            address = data.get("address")
            password = data.get("password")
            confirm_password = data.get("confirm_password")
            md1 = data.get("md1")
            md2 = data.get("md2")
            md3 = data.get("md3")

            # Validate required fields
            if not all([full_name, email, phone, address, password, confirm_password, md1, md2, md3]):
                return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

            # Validate password match
            if password != confirm_password:
                return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

            # Check if email already exists
            if DarshanUser.objects.filter(email=email).exists():
                return Response({"error": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

            # Generate OTP
            otp = get_random_string(length=6, allowed_chars="0123456789")

            # Send OTP email
            try:
                send_mail(
                    subject="Your Darshan Booking OTP",
                    message=f"Your OTP for email verification is: {otp}",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[email],
                    fail_silently=False,
                )
            except Exception as e:
                return Response({"error": f"Failed to send OTP: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Hash the password before saving
            hashed_password = make_password(password)

            # Create user with unverified status
            user = DarshanUser.objects.create(
                full_name=full_name,
                email=email,
                phone=phone,
                address=address,
                password=hashed_password,
                md1=md1,
                md2=md2,
                md3=md3,
                otp=otp,
                is_verified=False,
            )

            return Response({"message": "Registration successful! , verify otp", "user_id": user.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# myapp/views.py (continued)
class VerifyOtpView(APIView):
    def post(self, request, user_id):
        otp_entered = request.data.get("otp")
        try:
            user = DarshanUser.objects.get(id=user_id, otp=otp_entered)
            user.is_verified = True
            user.otp = None  # Clear OTP after verification
            user.save()
            return Response({"message": "Email verified successfully!"}, status=status.HTTP_200_OK)
        except DarshanUser.DoesNotExist:
            return Response({"error": "Invalid OTP or user ID."}, status=status.HTTP_400_BAD_REQUEST)


# myapp/views.py (continued)

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from myapp.models import DarshanUser  # Import your custom user model
from django.contrib.auth import get_user_model

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        User = get_user_model()  # Get the custom user model dynamically
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_verified:
            return Response({"error": "Email not verified."}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(password, user.password):
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate JWT tokens (without storing in DB)
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response({
            "message": "Login successful!",
            "refresh": str(refresh),
            "access": str(access),
        }, status=status.HTTP_200_OK)


# myapp/views.py (continued)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token
            return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Token invalid or error occurred: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

# myapp/views.py
import json
from datetime import datetime
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import TimeSlot, DarshanType, Booking, BookingMember

# -----------------------------
# Check Availability View
# -----------------------------
# myapp/views.py
from datetime import datetime
from django.http import JsonResponse
from django.views import View
from .models import TimeSlot, SlotDate

class CheckAvailability(View):
    def get(self, request, darshan_id, booking_date):
        try:
            # Convert booking_date from string to date object
            booking_date_obj = datetime.strptime(booking_date, "%Y-%m-%d").date()
            # Look up the SlotDate instance for the given date
            slot_date = SlotDate.objects.get(date=booking_date_obj)
            # Filter time slots by darshan type and the SlotDate instance
            time_slots = TimeSlot.objects.filter(darshan_type_id=darshan_id, slot_date=slot_date)
            availability = {}
            for slot in time_slots:
                availability[slot.new_time_range] = slot.available_slots
            return JsonResponse({"availability": availability}, status=200)
        except SlotDate.DoesNotExist:
            return JsonResponse({"error": "No slots found for this date."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

# -----------------------------
# Book Slot View
# -----------------------------
# myapp/views.py



from datetime import datetime
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import SlotDate, DarshanType, TimeSlot, Booking, BookingMember

class BookSlot(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        try:
            data = json.loads(request.body)
            darshan_type_id = data.get("darshan_type_id")
            booking_date = data.get("booking_date")  # Expecting "YYYY-MM-DD"
            time_slot_value = data.get("time_slot")   # e.g., "06:00 AM - 06:30 AM"
            persons = data.get("persons", 1)
            eca_person_name = data.get("eca_person_name")
            members = data.get("members", [])

            # Validate booking_date presence
            if not booking_date:
                return JsonResponse({"error": "booking_date is required."}, status=400)

            # Ensure maximum booking of 5 persons (self + up to 4 members)
            if persons > 5 or len(members) > 4:
                return JsonResponse({"error": "You can book a maximum of 5 persons at a time."}, status=400)

            # Parse booking_date string to a date object
            try:
                booking_date_obj = datetime.strptime(booking_date, "%Y-%m-%d").date()
            except ValueError:
                return JsonResponse({"error": "Invalid booking_date format, expected YYYY-MM-DD."}, status=400)

            # Get or create SlotDate instance
            slot_date, created = SlotDate.objects.get_or_create(date=booking_date_obj)
            print(f"SlotDate instance: {slot_date}, Created: {created}")

            # Validate darshan type
            try:
                darshan_type = DarshanType.objects.get(id=darshan_type_id)
            except DarshanType.DoesNotExist:
                return JsonResponse({"error": "Invalid Darshan type."}, status=400)

            # Validate time slot using the string value, darshan type, and the SlotDate
            try:
                time_slot = TimeSlot.objects.get(new_time_range=time_slot_value,
                                                 darshan_type=darshan_type,
                                                 slot_date=slot_date)
            except TimeSlot.DoesNotExist:
                return JsonResponse({"error": "Invalid time slot for the selected Darshan type and date."}, status=400)

            # Check slot availability
            if time_slot.available_slots < persons:
                return JsonResponse({"error": "Not enough slots available."}, status=400)

            # Create booking: assign the SlotDate instance directly to booking_date.
            booking = Booking.objects.create(
                user=request.user,
                darshan_type=darshan_type,
                booking_date=slot_date,  # This field uses db_column="booking_date_id" in the model
                time_slot=time_slot,
                persons=persons,
                eca_person_name=eca_person_name,
            )

            # Create associated booking members
            for member in members:
                BookingMember.objects.create(
                    booking=booking,
                    name=member["name"],
                    aadhar_number=member["aadhar_number"]
                )

            # Update available slots
            time_slot.available_slots -= persons
            time_slot.save()

            return JsonResponse({"message": "Booking successful!", "booking_id": booking.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data received."}, status=400)
        except Exception as e:
            print(f"Error: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)

# -----------------------------
# View Bookings View
# -----------------------------
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import Booking

class ViewBookings(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        data = []
        for booking in bookings:
            members = list(booking.members.values("name", "aadhar_number"))
            data.append({
                "darshan_name": booking.darshan_type.name,
                # Access the actual date via the SlotDate instance
                "booking_date": booking.booking_date.date.strftime("%Y-%m-%d"),
                "time_slot": booking.time_slot.new_time_range,
                "persons": booking.persons,
                "eca_person_name": booking.eca_person_name,
                "status": booking.status,
                "members": members
            })
        return JsonResponse(data, safe=False)

# -----------------------------
# Cancel Booking View
# -----------------------------
import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Booking, BookingMember

class CancelBooking(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            data = json.loads(request.body)
            booking_id = data["booking_id"]
            booking = Booking.objects.get(id=booking_id, user=request.user)
            time_slot = booking.time_slot

            # Restore the available slots for this time slot
            time_slot.available_slots += booking.persons
            time_slot.save()

            # Mark booking as cancelled
            booking.status = "Cancelled"
            booking.save()

            # Delete associated booking members
            BookingMember.objects.filter(booking=booking).delete()

            return JsonResponse({"message": "Booking cancelled successfully."})
        except Booking.DoesNotExist:
            return JsonResponse({"error": "Booking not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
