import { useQuery } from "@tanstack/react-query";
import { getPetsitterMyInfo } from "../services/petsitter";

export const useGetPetsitterInfoQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petsitterInfo"],
    queryFn: getPetsitterMyInfo,
    staleTime: 5 * 1000,
  });
  return { data, isLoading, error };
};
