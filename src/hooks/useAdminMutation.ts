import { useQuery } from "@tanstack/react-query";
import { getAdminServices } from "../services/admin";

export const useGetAdminServices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: getAdminServices,
    staleTime: 5 * 60 * 1000,
  });
  return { data, isLoading, error };
};
