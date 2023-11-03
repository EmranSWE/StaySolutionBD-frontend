import { months } from "@/constants/global";

export const getMonthName = (monthNumber: number) => {
  const selectedMonth = months.find((month) => month.value === monthNumber);
  return selectedMonth ? selectedMonth.label : "Invalid Month";
};
