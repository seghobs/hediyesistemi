import { differenceInDays, format } from 'date-fns';

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

export const canReceiveGift = (lastGiftDate: string | null) => {
  if (!lastGiftDate) return true;
  return differenceInDays(new Date(), new Date(lastGiftDate)) >= 20;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};