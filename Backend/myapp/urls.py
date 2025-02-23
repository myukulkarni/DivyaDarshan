# myapp/urls.py
from django.urls import path
from .views import RegisterView, VerifyOtpView, LoginView, LogoutView
from .views import CheckAvailability
from .views import BookSlot, ViewBookings, CancelBooking

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/<int:user_id>/', VerifyOtpView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('availability/<int:darshan_id>/<str:booking_date>/', CheckAvailability.as_view()),
    path('book_slot/', BookSlot.as_view()),
    path('my_bookings/', ViewBookings.as_view()),
     path('cancel_booking/', CancelBooking.as_view()),
]

    