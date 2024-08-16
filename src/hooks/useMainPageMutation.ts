// 메인 페이지

import { useQuery } from "@tanstack/react-query";
import { getPetsitters } from "../services/petsitter";
import { IOptions } from "../pages/PetList/types/main";
import { getPetPartiesInfo } from "../services/pet";

// 펫시터 목록 불러오기
export const useGetPetsitters = (options: IOptions, currentPage: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petsitters", options, currentPage],
    queryFn: () => getPetsitters(options, currentPage),
    staleTime: 5 * 60 * 1000,
  });
  return { data, isLoading, error };
};
