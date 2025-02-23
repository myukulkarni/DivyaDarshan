from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.conf import settings

class DarshanUser(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    password = models.CharField(max_length=128, null=True)
    confirm_password = models.CharField(max_length=128, null=True)
    md1 = models.CharField(max_length=255, help_text="Safety Field 1")
    md2 = models.CharField(max_length=255, help_text="Safety Field 2")
    md3 = models.CharField(max_length=255, help_text="Safety Field 3")
    otp = models.CharField(max_length=6, blank=True, null=True, help_text="OTP for email verification")
    is_verified = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)  # Add this line


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'phone', 'address', 'md1', 'md2', 'md3']

    def __str__(self):
        return self.email


class DarshanType(models.Model):
    name = models.CharField(max_length=255)
    max_slots_per_time = models.IntegerField()  # Max capacity per time slot

    def __str__(self):
        return self.name
    
class SlotDate(models.Model):
    date = models.DateField(unique=True,null=True)

    def __str__(self):
        return str(self.date)

class TimeSlot(models.Model):
    darshan_type = models.ForeignKey(DarshanType, on_delete=models.CASCADE, related_name="time_slots")
    new_time_range = models.CharField(max_length=20, null=True)  # Temporary field
    total_slots = models.IntegerField()
    available_slots = models.IntegerField()
    slot_date = models.ForeignKey(SlotDate, on_delete=models.CASCADE,null=True)  # Now a foreign key

    def __str__(self):
        return f"{self.darshan_type.name} - {self.new_time_range}"



class Booking(models.Model):
    user = models.ForeignKey(settings .AUTH_USER_MODEL, on_delete=models.CASCADE)
    darshan_type = models.ForeignKey(DarshanType, on_delete=models.CASCADE)
    booking_date = models.ForeignKey(SlotDate, on_delete=models.CASCADE, db_column="booking_date_id")
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)  # FIXED slot
    persons = models.IntegerField()
    eca_person_name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default="Booked")

    def __str__(self):
        return f"{self.user.email} - {self.darshan_type.name} - {self.booking_date}"

class BookingMember(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="members")
    name = models.CharField(max_length=255)
    aadhar_number = models.CharField(max_length=12, unique=True)

    def __str__(self):
        return f"{self.name} ({self.aadhar_number})"



