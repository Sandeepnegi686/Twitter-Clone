import { create } from "zustand";

type UserType = { _id: string; email: string; name: string };

interface userModelType {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

const useUserModel = create<userModelType>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// export default useUserModel;
