import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IUserRequest, IUserRes } from "../types/user.types";
import useIdStore from "../store/id";
import { PostSignIn } from "../services/auth";
import { toast } from "react-toastify";
import useUserStore from "../store/user";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const { rememberedId, setRememberedId, clearRememberedId } = useIdStore();

  return useMutation({
    mutationFn: (userInfo: IUserRequest) => PostSignIn(userInfo),
    onError: (error) => {
      toast.error("로그인 실패");
    },
    onSuccess: (data) => {
      // 로그인 상태 업데이트
      // const isUser = data.data.result.authority === "USER";
      // setUserInfoState({ ...data.data.result, isLogin: true });
      toast.success("로그인 성공");
      setUser(data);
      navigate("/");
    },
  });
};
