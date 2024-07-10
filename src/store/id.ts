import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserId {
  rememberedId: string;
  setRememberedId: (id: string) => void;
  clearRememberedId: () => void;
}

const useIdStore = create(
  persist<IUserId>(
    (set) => ({
      rememberedId: "",
      setRememberedId: (id: string) => set({ rememberedId: id }),
      clearRememberedId: () => set({ rememberedId: "" }),
    }),
    {
      name: "remembered-id-storage", // 저장할 localStorage 키 이름
    },
  ),
);

export default useIdStore;
