export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/png' });
}

export const formatDate = (date) => {
  if (!date) {
    return null
  }
  return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const format3Digit = (number) => {
  try {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 3,
      useGrouping: true
    })
  } catch (error) {
    return '000'
  }
}

export const getWeeks = (year) => {
  const weeks = [];

  if (!year) {
    year = new Date().getFullYear();
  }

  // Set to the first day of the year
  let currentDay = new Date(year, 0, 1);

  // Loop until we're no longer in the same year
  while (currentDay.getFullYear() === year) {
    // Ensure the current day is Monday
    while (currentDay.getDay() !== 1) {
      currentDay.setDate(currentDay.getDate() - 1);
    }

    // Save the start of the week
    const startOfWeek = new Date(currentDay);

    // Move to the end of the week
    currentDay.setDate(currentDay.getDate() + 6);

    // Save the end of the week
    const endOfWeek = new Date(currentDay);

    // Move to the next day
    currentDay.setDate(currentDay.getDate() + 1);

    // Push the week to the array
    weeks.push({ start: startOfWeek, end: endOfWeek });
  }

  return weeks;
};

export const getWeek = (weeks) => {
  const startOfWeek = new Date(weeks.start);
  const endOfWeek = new Date(weeks.end);

  const datesOfWeek = [];

  // Copy the start date to iterate
  let currentDate = new Date(startOfWeek);

  // Loop from start date to end date, inclusive
  while (currentDate <= endOfWeek) {
    datesOfWeek.push(new Date(currentDate)); // Add a new date object to avoid reference issues
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return datesOfWeek;
};

export const transformDates = (dates) => {
  const daysOfWeek = {
    SENIN: [],
    SELASA: [],
    RABU: [],
    KAMIS: [],
    JUMAT: [],
    SABTU: [],
    MINGGU: []
  };

  dates.forEach(date => {
    const dayIndex = new Date(date).getDay();
    switch (dayIndex) {
      case 0:
        daysOfWeek.MINGGU.push(date);
        break;
      case 1:
        daysOfWeek.SENIN.push(date);
        break;
      case 2:
        daysOfWeek.SELASA.push(date);
        break;
      case 3:
        daysOfWeek.RABU.push(date);
        break;
      case 4:
        daysOfWeek.KAMIS.push(date);
        break;
      case 5:
        daysOfWeek.JUMAT.push(date);
        break;
      case 6:
        daysOfWeek.SABTU.push(date);
        break;
      default:
        break;
    }
  });

  const formattedDates = {};
  for (const day in daysOfWeek) {
    formattedDates[day] = daysOfWeek[day].map(date => formatDate(date)).join('/');
  }

  return formattedDates;
}

export const getMonthId = (date) => {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dateParts = date.split('-');
  const currentDate = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);
  const month = currentDate.getMonth();

  return months[month];
};


export const currentDateUnique = () => {
  const currentDate = new Date();
  const uniqueId = currentDate.toISOString().replace(/[-T:.Z]/g, '');

  return uniqueId
}


