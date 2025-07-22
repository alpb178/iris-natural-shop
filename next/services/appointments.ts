import { fetcher } from "@/lib/strapi/fetcher";

export const getAppointments = async (date: string) => {
  const appointments = await fetcher(
    `/api/appointments?populate=*&filters[date][$eq]=${date}`
  );

  return appointments;
};
