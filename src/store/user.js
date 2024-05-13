import create from 'zustand';
import { persist } from 'zustand/middleware';

const defaultUser = {
  role: '',
  userName: '',
  userProfile: '',
};

// const useUserStore = create((set) => ({
//   user: defaultUser,
//   setUser: (user) => set({ user }),
//   logout: () => set({ user: defaultUser }),
// }));

const useUserStore = create(
  persist(
    (set) => ({
      user: defaultUser,
      // setUser: (value) => set({ user: value }),
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
