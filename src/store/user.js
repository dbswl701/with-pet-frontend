import create from 'zustand';
import { persist } from 'zustand/middleware';

const defaultUser = {
  role: '',
  userName: '',
  userProfile: '',
};

const useUserStore = create(
  persist(
    (set) => ({
      user: defaultUser,
      // setUser: (value) => set({ user: value }),
      //   setUser: (user) => set({ user }),
      setUser: (newValue) => set((state) => ({ user: { ...state.user, ...newValue } })),
      logout: () => set({ user: defaultUser }),
    }),
    {
      name: 'userInfo',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
