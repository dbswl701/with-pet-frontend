import create from 'zustand';
import { persist } from 'zustand/middleware';

const useIdStore = create(persist(
  (set) => ({
    rememberedId: '',
    setRememberedId: (id) => set({ rememberedId: id }),
    clearRememberedId: () => set({ rememberedId: '' }),
  }),
  {
    name: 'remembered-id-storage', // 저장할 localStorage 키 이름
  },
));

export default useIdStore;
