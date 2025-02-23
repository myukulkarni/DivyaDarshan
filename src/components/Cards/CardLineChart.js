import { useState } from "react";
import { IoIosMan } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CardLineChart.css";

const SeatAvailabilityCard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(
    Array.from({ length: 34 }, () => ({ available: 15, waiting: 0 }))
  );
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userData, setUserData] = useState({
    members: 1,
    male: 0,
    female: 0,
    malesInfo: [],
    femalesInfo: [],
  });

  const handleSlotBooking = (index) => {
    setSelectedSlot(index);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const totalMembers = parseInt(userData.male) + parseInt(userData.female);

    if (totalMembers !== parseInt(userData.members)) {
      alert("❌ Male & Female count must match total members!");
      return;
    }

    const updatedSlots = [...slots];

    if (updatedSlots[selectedSlot].available >= totalMembers) {
      updatedSlots[selectedSlot].available -= totalMembers;
      alert("✅ Slot booked successfully!");
    } else if (updatedSlots[selectedSlot].waiting < 5) {
      updatedSlots[selectedSlot].waiting += totalMembers;
      alert("⚠ Added to waiting list!");
    } else {
      alert("❌ No more bookings allowed (Full + Waiting List Full)!");
    }

    setSlots(updatedSlots);
    setShowForm(false);
    setUserData({ members: 1, male: 0, female: 0, malesInfo: [], femalesInfo: [] });
  };

  return (
    <div className="seat-card"style={{marginTop:'60px',width:'1265px',marginLeft:'-55px'}}>
      <h2 className="title"style={{marginBottom:'10px',marginLeft:'50px'}}>Seat Availability</h2>
      <label>Select Date:  </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
      />
      {selectedDate && (
        <div className="slots-container">
          <div className="slots"style={{marginTop:'20px'}}>
            {slots.map((slot, index) => {
              const startHour = 6; // Start at 6 AM
              const hours = startHour + Math.floor(index / 2);
              const minutes = index % 2 === 0 ? "00" : "30";
              const period = hours < 12 ? "AM" : "PM";
              const formattedHour = hours > 12 ? hours - 12 : hours;

              return (
                <button
                  key={index}
                  onClick={() => handleSlotBooking(index)}
                  disabled={slot.available === 0 && slot.waiting >= 5}
                  className="slot-button p-4 border rounded-lg shadow-md text-center flex flex-col items-center"
                >
                  <span>{`${formattedHour}:${minutes} ${period} (${slot.available} seats left)`}</span>
                  <span className="icons">
                    <div className="icon-grid">
                      {[...Array(slot.available)].map((_, i) => (
                        <IoIosMan key={`green-${i}`} className="icon green" />
                      ))}
                      {[...Array(15 - slot.available)].map((_, i) => (
                        <IoIosMan key={`red-${i}`} className="icon red" />
                      ))}
                      {[...Array(slot.waiting)].map((_, i) => (
                        <IoIosMan key={`yellow-${i}`} className="icon yellow" />
                      ))}
                    </div>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>Slot Booking</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="number"
                placeholder="Number of Members"
                min="1"
                max="5"
                value={userData.members}
                onChange={(e) => setUserData({ ...userData, members: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Male Count"
                min="0"
                value={userData.male}
                onChange={(e) => setUserData({ ...userData, male: parseInt(e.target.value) || 0 })}
                required
              />
              <input
                type="number"
                placeholder="Female Count"
                min="0"
                value={userData.female}
                onChange={(e) => setUserData({ ...userData, female: parseInt(e.target.value) || 0 })}
                required
              />
              {[...Array(userData.male || 0)].map((_, i) => (
                <div key={i} className="member-info">
                  <input type="text" placeholder={`Male ${i + 1} Name`} required />
                  <input
                    type="text"
                    placeholder={`Male ${i + 1} Aadhar`}
                    value={userData.malesInfo[i] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 12) {
                        const updatedMales = [...userData.malesInfo];
                        updatedMales[i] = value;
                        setUserData({ ...userData, malesInfo: updatedMales });
                      }
                    }}
                    maxLength="12"
                    required
                  />
                </div>
              ))}
              {[...Array(userData.female || 0)].map((_, i) => (
                <div key={i} className="member-info">
                  <input type="text" placeholder={`Female ${i + 1} Name`} required />
                  <input
                    type="text"
                    placeholder={`Female ${i + 1} Aadhar`}
                    value={userData.femalesInfo[i] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 12) {
                        const updatedFemales = [...userData.femalesInfo];
                        updatedFemales[i] = value;
                        setUserData({ ...userData, femalesInfo: updatedFemales });
                      }
                    }}
                    maxLength="12"
                    required
                  />
                </div>
              ))}
              <button type="submit">Confirm Booking</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatAvailabilityCard;