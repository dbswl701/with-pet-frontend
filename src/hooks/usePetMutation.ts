import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPetPartiesInfo,
  postDogIntoParty,
  postPetPartyCreate,
} from "../services/pet";
import { toast } from "react-toastify";
import { IAddPetReq, IPartyReq } from "../pages/PetList/types/parties";

// 반려견 파티 정보 불러오기
export const useGetPetPartiesInfo = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["parties"],
    queryFn: getPetPartiesInfo,
  });
  return { data, isLoading, error };
};

// 반려견 파티 생성
export const usePostPetPartyCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (partyInfo: IPartyReq) => postPetPartyCreate(partyInfo),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data, variables) => {
      // toast.success(data);
      console.log("성공", "data:", data, "variables: ", variables);
      // queryClient.setQueryData()
    },
  });
};

// 파티에 반려견 추가
export const usePostAddDogIntoParty = () => {
  return useMutation({
    mutationFn: ({
      partyId,
      petInfo,
    }: {
      partyId: number;
      petInfo: IAddPetReq;
    }) => postDogIntoParty(partyId, petInfo),
    onError: () => {},
    onSuccess: () => {},
  });
};
