export const getCurrentWeekNumber = () => {
  const now = new Date();
  const d: any = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export const getWeekNumber = (date: any) => {
  const d: any = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart: any = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

export const getCurrentMonth = () => {
  const now = new Date();
  return now.getMonth() + 1;
};

export const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear();
};

// generate Weekly Report
export function generateWeeklyReport(data: any) {
  const today = new Date();

  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));

  const weeklySums: any = {};

  for (const transaction of data) {
    const transactionDate = new Date(transaction.createdAt);

    if (
      transactionDate >= weekStart &&
      transactionDate < getEndOfWeek(weekStart)
    ) {
      const dayOfWeek = transactionDate.getDay();

      if (!weeklySums[dayOfWeek]) {
        weeklySums[dayOfWeek] = 0;
      }

      weeklySums[dayOfWeek] += transaction.amount;
    }
  }

  function getEndOfWeek(startDate: any) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (6 - startDate.getDay()));
    endDate.setHours(23, 59, 59, 999);
    return endDate;
  }

  return weeklySums;
}

// generate monthly Report
export function generateMonthlyReport(data: any) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const monthlySums: any = {};

  for (const transaction of data) {
    const transactionDate = new Date(transaction.createdAt);

    if (
      transactionDate.getMonth() === month &&
      transactionDate.getFullYear() === year
    ) {
      if (!monthlySums[month]) {
        monthlySums[month] = 0;
      }

      monthlySums[month] += transaction.amount;
    }
  }

  return monthlySums;
}

// generate yearly Report
export function generateYearlyReport(data: any) {
  const year = new Date().getFullYear();

  const yearlySums: any = {};

  for (const transaction of data) {
    const transactionDate = new Date(transaction.createdAt);

    if (transactionDate.getFullYear() === year) {
      if (!yearlySums[year]) {
        yearlySums[year] = 0;
      }

      yearlySums[year] += transaction.amount;
    }
  }
  return yearlySums;
}

// Function to get year
export function generateYears(date: any) {
  const userYear = new Date(date).getFullYear();
  const years = [];

  for (let i = 0; i < 6; i++) {
    years.push(userYear + i);
  }

  return years;
}

// Function to get short month names
export function getShortMonthNames() {
  const months = [];
  const date = new Date();

  for (let i = 0; i < 12; i++) {
    date.setMonth(i);
    date.setDate(1);

    const monthShortName = date.toLocaleDateString("en-US", { month: "short" });

    months.push(monthShortName);
  }

  return months;
}

// Function to get short weekday names
export function generateShortWeekdayNames(startDay: string) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const startIdx = weekdays.indexOf(startDay);

  if (startIdx === -1) {
    throw new Error(
      "Invalid start day provided. Must be one of: Sun, Mon, Tue, Wed, Thu, Fri, Sat"
    );
  }

  const rotatedWeekdays = weekdays
    .slice(startIdx)
    .concat(weekdays.slice(0, startIdx));

  return rotatedWeekdays;
}

// object to convert array index wise
export function convertObjToArr(data: any) {
  const array = [];
  for (let key in data) {
    const index = parseInt(key, 10);

    while (array.length <= index) {
      array.push(0);
    }

    array[index] += data[key];
  }
  return array;
}
