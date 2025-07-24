import { APPOINTMENTS_API_URL } from "@/lib/constants/endpoints";
import { fetcher } from "@/lib/strapi/fetcher";

export const getAppointments = async (date: string) => {
  const appointments = await fetcher(
    `${APPOINTMENTS_API_URL}?populate=*&filters[date][$eq]=${date}`
  );

  return appointments;
};
