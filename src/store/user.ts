import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserRes } from "../types/user.types";

const defaultUser: IUserRes = {
  userRole: "",
  userName: "",
  userProfile: "",
};

interface ISaveUserInfo {
  user: IUserRes;
  version: number;
}

interface IUserState {
  user: IUserRes;
  setUser: (newValue: IUserRes) => void;
  logout: () => void;
}
type UseUserStoreType = {
  user: IUserRes;
  setUser: (newValue: IUserRes) => void;
  logout: () => void;
};
interface State {
  user: IUserRes;
  setUser: (newValue: IUserRes) => void;
  logout: () => void;
}
const useUserStore = create(
  persist<State>(
    (set) => ({
      user: defaultUser,
      setUser: (newValue: IUserRes) => set({ user: newValue }),
      // setUser: (newValue: IUserRes) => set((state: ISaveUserInfo) => ({ user: { ...state.user, ...newValue } })),
      logout: () => set({ user: defaultUser }),
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
    }
  )
);
// export const useBooleanState = () =>
//   useUserStore((state) => state.user);

//   export const useBooleanStateAction = () =>
//     useUserStore((state) => state.setUser);
export default useUserStore;
