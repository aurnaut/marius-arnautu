import React, { useState, useEffect } from "react";

const TodayDate = () => {

  const getWeekDay = (date) => {
    let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let day = date.getDay();

    return weekDays[day];
  }

  const getMonthName = (date) => {
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = date.getMonth(); 

    return monthNames[month];
  }

  // Set after mount, so visitors see their own local date rather than the build date
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (!currentDate) {
    return <span className="todays-date" />;
  }

  let namedDay = getWeekDay(currentDate);
  let numberedDay = currentDate.getDate();
  let namedMonth = getMonthName(currentDate);

  return (
    <span className="todays-date">
      {namedDay}, {numberedDay} {namedMonth}
    </span>
  )
}

export default TodayDate;