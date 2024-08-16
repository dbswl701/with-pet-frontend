import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDog,
  deleteParty,
  getPetPartiesInfo,
  postDogIntoParty,
  postIntoParty,
  postPetPartyCreate,
  putModifyDog,
} from "../services/pet";
import { toast } from "react-toastify";
import {
  IAddPetReq,
  IAddPetRes,
  IJoinPartyReq,
  IModifyPetReq,
  IPartiesRes,
  IPartyReq,
} from "../pages/PetList/types/parties";

// 반려견 파티 정보 불러오기
export const useGetPetPartiesInfo = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["parties"],
    queryFn: getPetPartiesInfo,
    staleTime: 5 * 60 * 1000,
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
      console.log("반려견 등록 데이터 확인: ", data);
      // IAddPetRes가 아니라 파티 정보 다 불러와야 함.
      queryClient.setQueryData<IPartiesRes[]>(["parties"], (prev) => {
        console.log("파티 생성, prev 확인:", prev, "data: ", data);
        if (!prev) return prev;
        // 여기다가 붙이는게 아니라, 해당 파티의 목록에다가 추가.
        // return [data, ...prev];
        // 오... 이거 partyLeaderId, partyLeaderEmail 혼용때문에 map을 못도는 문제였다.
        return [...prev, data];
      });
    },
  });
};

// 파티에 반려견 추가
export const usePostAddDogIntoParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      partyId,
      petInfo,
    }: {
      partyId: number;
      petInfo: IAddPetReq;
    }) => postDogIntoParty(partyId, petInfo),
    onError: () => {},
    onSuccess: (data, variables) => {
      console.log("반려견 등록 데이터 확인: ", data);
      queryClient.setQueryData<IPartiesRes>(["parties"], (prev) => {
        console.log("prev:", prev);
        if (!prev) return prev;
        // 여기다가 붙이는게 아니라, 해당 파티의 목록에다가 추가.
        console.log(
          "<<<>>>, partyDogList",
          prev.partyDogList,
          "variables:",
          variables
        );
        // return [data, ...prev];
      });
      // 성공해서 받아온 data를 queryClient를 이용해서 저장하자.
    },
  });
};

// 반려견 정보 수정
export const usePutModifyDog = () => {
  return useMutation({
    mutationFn: ({
      dogId,
      dogInfo,
    }: {
      dogId: number;
      dogInfo: IModifyPetReq;
    }) => putModifyDog(dogId, dogInfo),
    onError: () => {},
    onSuccess: () => {},
  });
};

// 파티 탈퇴
export const useDeleteParty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (partyId: number) => deleteParty(partyId),
    onSuccess: (data, variables) => {
      toast.success(data);
      queryClient.setQueryData<IPartiesRes[]>(["parties"], (prev) => {
        if (!prev) return prev;
        return prev.filter((party) => party.partyId !== variables);
      });
    },
    onError: () => {
      toast.error("그룹 탈퇴에 실패했습니다.");
    },
  });
};

// 반려견 삭제
export const useDeleteDogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dogId, partyId }: { dogId: number; partyId: number }) =>
      deleteDog(dogId),
    onSuccess: (data, variables) => {
      toast.success("반려견을 삭제하였습니다.");
      queryClient.setQueryData<IPartiesRes[]>(["parties"], (prev) => {
        if (!prev) return prev;
        const updatedParties = prev
          .filter(() => !data.isDeletedParty) // 그룹의 마지막 개라면, 그룹 삭제
          .map((party) => {
            if (party.partyId === variables.partyId) {
              return {
                ...party,
                partyDogList: party.partyDogList.filter(
                  (dog) => dog.dogId !== variables.dogId
                ),
              };
            }
            return party;
          });
        return updatedParties;
      });
    },
    onError: () => {
      toast.error("반려견 삭제에 실패하였습니다.");
    },
  });
};

// 파티에 참여하기
export const usePostJoinPartyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (partyIsbn: IJoinPartyReq) => postIntoParty(partyIsbn),
    onSuccess: (data) => {
      // 파티에 들어가보자
      queryClient.setQueryData<IPartiesRes[]>(["parties"], (prev) => {
        if (!prev) return prev;
        // 그냥 파티에 추가하면 된다.
        return [...prev, data];
      });
    },
    onError: () => {},
  });
};
