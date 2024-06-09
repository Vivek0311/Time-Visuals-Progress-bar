function updateProgressBars() {
  const currentDate = new Date();

  const dateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(
    "en-US",
    dateFormatOptions
  );
  const week = Math.ceil(
    ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 + 1) /
      7
  );

  document.getElementById("progressInfo").innerHTML = `
        <p>Current Date and Time: ${formattedDate}</p>
        <p>Day of the Week: ${currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        })}</p>
        <p>Week: ${week}</p>
        <p>Month: ${currentDate.toLocaleDateString("en-US", {
          month: "long",
        })}</p>
        <p>Quarter: ${Math.ceil((currentDate.getMonth() + 1) / 3)}</p>
        <p>Half-Year Session: ${currentDate.getMonth() < 6 ? 1 : 2}</p>
        <p>Year: ${currentDate.getFullYear()}</p>
      `;

  const totalMillisecondsInDay = 24 * 60 * 60 * 1000;
  const elapsedMilliseconds =
    currentDate.getHours() * 60 * 60 * 1000 +
    currentDate.getMinutes() * 60 * 1000 +
    currentDate.getSeconds() * 1000 +
    currentDate.getMilliseconds();
  const dayProgress = (elapsedMilliseconds / totalMillisecondsInDay) * 100;

  const totalMillisecondsInWeek = 7 * totalMillisecondsInDay;
  const elapsedMillisecondsWeek =
    currentDate.getDay() * totalMillisecondsInDay + elapsedMilliseconds;
  const weekProgress =
    (elapsedMillisecondsWeek / totalMillisecondsInWeek) * 100;

  const totalDaysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const elapsedDaysInMonth = currentDate.getDate();
  const elapsedMillisecondsInMonth =
    (elapsedDaysInMonth - 1) * totalMillisecondsInDay + elapsedMilliseconds;
  const monthProgress =
    (elapsedMillisecondsInMonth / (totalDaysInMonth * totalMillisecondsInDay)) *
    100;

  // Quarter Progress
  const isLeapYear = (year) =>
    year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  const currentYear = currentDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
  const startOfQuarter = new Date(
    currentDate.getFullYear(),
    quarterStartMonth,
    1
  );
  const endOfQuarter = new Date(
    currentDate.getFullYear(),
    quarterStartMonth + 3,
    0
  );

  const quarterDaysInYear = isLeapYear(currentYear)
    ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const totalDaysInQuarter = quarterDaysInYear
    .slice(quarterStartMonth, quarterStartMonth + 3)
    .reduce((acc, val) => acc + val, 0);
  const totalMillisecondsInQuarter = totalDaysInQuarter * 24 * 60 * 60 * 1000;

  const elapsedMillisecondsInQuarter = currentDate - startOfQuarter;
  const quarterProgress =
    (elapsedMillisecondsInQuarter / totalMillisecondsInQuarter) * 100;

  // Half-Year Progress

  const halfYearStart = new Date(currentYear, 0, 1); // January 1st of the current year
  const halfYearMiddle = new Date(currentYear, 5, 30); // June 30th of the current year

  let totalMillisecondsInHalfYear = halfYearMiddle - halfYearStart;
  const elapsedMillisecondsInHalfYear = currentDate - halfYearStart;
  const isCurrentYearLeap = isLeapYear(currentYear);

  // For leap years, add an extra day to the second half of the year
  if (isCurrentYearLeap && currentDate <= halfYearMiddle) {
    totalMillisecondsInHalfYear += 24 * 60 * 60 * 1000; // Add one day in milliseconds
  }

  const halfYearProgress =
    (elapsedMillisecondsInHalfYear / totalMillisecondsInHalfYear) * 100;

  // Year Progress

  const totalDaysInYear = isLeapYear(currentDate.getFullYear()) ? 366 : 365;
  const totalMillisecondsInYear = totalDaysInYear * 24 * 60 * 60 * 1000;
  const elapsedMillisecondsInYear =
    currentDate - new Date(currentDate.getFullYear(), 0, 1);
  const yearProgress =
    (elapsedMillisecondsInYear / totalMillisecondsInYear) * 100;

  // Hour Progress
  const totalMillisecondsInHour = 60 * 60 * 1000;
  const elapsedMillisecondsInHour =
    currentDate.getMinutes() * 60 * 1000 +
    currentDate.getSeconds() * 1000 +
    currentDate.getMilliseconds();
  const hourProgress =
    (elapsedMillisecondsInHour / totalMillisecondsInHour) * 100;

  // Minute Progress
  const totalMillisecondsInMinute = 60 * 1000;
  const elapsedMillisecondsInMinute =
    currentDate.getSeconds() * 1000 + currentDate.getMilliseconds();
  const minuteProgress =
    (elapsedMillisecondsInMinute / totalMillisecondsInMinute) * 100;

  document.getElementById(
    "hourProgressBar"
  ).style.width = `${hourProgress.toFixed(4)}%`;
  document.getElementById(
    "hourProgressText"
  ).textContent = `${hourProgress.toFixed(4)}%`;

  document.getElementById(
    "minuteProgressBar"
  ).style.width = `${minuteProgress.toFixed(4)}%`;
  document.getElementById(
    "minuteProgressText"
  ).textContent = `${minuteProgress.toFixed(4)}%`;

  document.getElementById(
    "dayProgressBar"
  ).style.width = `${dayProgress.toFixed(4)}%`;
  document.getElementById(
    "dayProgressText"
  ).textContent = `${dayProgress.toFixed(4)}%`;

  document.getElementById(
    "weekProgressBar"
  ).style.width = `${weekProgress.toFixed(4)}%`;
  document.getElementById(
    "weekProgressText"
  ).textContent = `${weekProgress.toFixed(4)}%`;

  document.getElementById(
    "monthProgressBar"
  ).style.width = `${monthProgress.toFixed(6)}%`;
  document.getElementById(
    "monthProgressText"
  ).textContent = `${monthProgress.toFixed(6)}%`;

  document.getElementById(
    "quarterProgressBar"
  ).style.width = `${quarterProgress.toFixed(6)}%`;
  document.getElementById(
    "quarterProgressText"
  ).textContent = `${quarterProgress.toFixed(6)}%`;

  document.getElementById(
    "halfYearProgressBar"
  ).style.width = `${halfYearProgress.toFixed(6)}%`;
  document.getElementById(
    "halfYearProgressText"
  ).textContent = `${halfYearProgress.toFixed(6)}%`;

  document.getElementById(
    "yearProgressBar"
  ).style.width = `${yearProgress.toFixed(4)}%`;
  document.getElementById(
    "yearProgressText"
  ).textContent = `${yearProgress.toFixed(4)}%`;

  const totalMillisecondsInMinute1 = 60 * 1000;
  const remainingSecondsInMinute = Math.floor(
    (totalMillisecondsInMinute1 -
      (currentDate.getSeconds() * 1000 + currentDate.getMilliseconds())) /
      1000
  );
  const minuteProgressRemaining = (remainingSecondsInMinute / 60) * 100;

  const totalMillisecondsInHour1 = 60 * 60 * 1000;
  const remainingMinutesInHour = Math.floor(
    (totalMillisecondsInHour1 -
      (currentDate.getMinutes() * 60 * 1000 +
        currentDate.getSeconds() * 1000 +
        currentDate.getMilliseconds())) /
      (60 * 1000)
  );
  const hourProgressRemaining = (remainingMinutesInHour / 60) * 100;

  const totalMillisecondsInDay1 = 24 * 60 * 60 * 1000;
  const remainingHoursInDay = Math.floor(
    (totalMillisecondsInDay1 -
      (currentDate.getHours() * 60 * 60 * 1000 +
        currentDate.getMinutes() * 60 * 1000 +
        currentDate.getSeconds() * 1000 +
        currentDate.getMilliseconds())) /
      (60 * 60 * 1000)
  );
  const dayProgressRemaining = (remainingHoursInDay / 24) * 100;

  const totalMillisecondsInWeek1 = 7 * totalMillisecondsInDay1;
  const remainingDaysInWeek = Math.floor(
    (totalMillisecondsInWeek1 -
      (currentDate.getDay() * totalMillisecondsInDay1 +
        currentDate.getHours() * 60 * 60 * 1000 +
        currentDate.getMinutes() * 60 * 1000 +
        currentDate.getSeconds() * 1000 +
        currentDate.getMilliseconds())) /
      (24 * 60 * 60 * 1000)
  );
  const weekProgressRemaining = (remainingDaysInWeek / 7) * 100;

  // Update the progress bars with remaining time
  // document.getElementById('minutesRemainingBar').style.width = `${minuteProgressRemaining.toFixed(4)}%`;
  document.getElementById("minutesRemainingBar").style.width = `${
    100 - minuteProgress.toFixed(4)
  }%`;
  document.getElementById(
    "minutesRemainingText"
  ).textContent = `${remainingSecondsInMinute} secs`;

  document.getElementById("hoursRemainingBar").style.width = `${
    100 - hourProgress.toFixed(4)
  }%`;
  document.getElementById(
    "hoursRemainingText"
  ).textContent = `${remainingMinutesInHour} mins ${remainingSecondsInMinute} secs`;

  document.getElementById("daysRemainingBar").style.width = `${
    100 - dayProgress.toFixed(4)
  }%`;
  document.getElementById(
    "daysRemainingText"
  ).textContent = `${remainingHoursInDay} hrs ${remainingMinutesInHour} mins ${remainingSecondsInMinute} secs`;

  document.getElementById("weeksDaysRemainingBar").style.width = `${
    100 - weekProgress.toFixed(4)
  }%`;
  document.getElementById(
    "weeksDaysRemainingText"
  ).textContent = `${remainingDaysInWeek} days ${remainingHoursInDay} hrs`;

  //testing part
  const remainingDaysInMonth =
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate() - currentDate.getDate();
  const monthProgressRemaining = (
    (remainingDaysInMonth /
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate()) *
    100
  ).toFixed(4);

  document.getElementById(
    "monthsRemainingBar"
  ).style.width = `${monthProgressRemaining}%`;
  document.getElementById(
    "monthsRemainingText"
  ).textContent = `${remainingDaysInMonth} days`;

  document.getElementById(
    "quartersRemainingBar"
  ).style.width = `${monthProgressRemaining}%`;
  document.getElementById(
    "quartersRemainingText"
  ).textContent = `${remainingDaysInMonth} days`;
  //testing part
}

function getWeekNumber(date) {
  const weekNumber = Math.ceil(
    ((date - new Date(date.getFullYear(), 0, 1)) / 86400000 + 1) / 7
  );
  return weekNumber;
}

function getQuarter(date) {
  const quarter = Math.floor((date.getMonth() + 3) / 3);
  return quarter;
}

function getHalfYear(date) {
  const halfYear = date.getMonth() < 6 ? 1 : 2;
  return halfYear;
}

updateProgressBars();
setInterval(updateProgressBars, 1);
