import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = (props) => {
  // Initialize selected dates
  console.log("props.selectedDates")
  console.log(props.selectedDates)
  const [selectedDates, setSelectedDates] = useState(props.selectedDates);

  // Toggle date selection
  const handleDateClick = (date) => {
    const dateIndex = selectedDates.findIndex((selectedDate) => new Date(selectedDate).toDateString() === date.toDateString());

    if (dateIndex !== -1) {
      // Date is already selected, so remove it
      let removedDate = selectedDates[dateIndex];
      
      const newDates = [...selectedDates];
      newDates.splice(dateIndex, 1);
      setSelectedDates(newDates);
      props.removedDated({dt: removedDate, lastDate: selectedDates[selectedDates.length-1]})
    } else {
      // Date is not selected, so add it
      setSelectedDates([...selectedDates, date]);
    }
  };
  const isDateEnabled = (date) => {
    return selectedDates.some((selectedDate) => new Date(selectedDate).toDateString() === date.toDateString());
  };
  return (
    <div>
      {/* <h2>Select Dates</h2> */}
      <DatePicker
        inline
        selected={null}
        onChange={handleDateClick}
        // highlightDates={selectedDates.map((date) => new Date(date))}
        filterDate={isDateEnabled}
        dayClassName={(date) =>
          selectedDates.find((selectedDate) => new Date(selectedDate).toDateString() === date.toDateString()) ? 'selected-date' : undefined
        }
      />
    </div>
  );
};

export default CalendarComponent;
