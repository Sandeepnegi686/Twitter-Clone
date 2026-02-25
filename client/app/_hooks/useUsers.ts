import useSWR from "swr";
import { fetcher } from "../_lib/fetcher";
import { UserType } from "../types/UserType";
import { create } from "zustand";

export function getAllUsers() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/getAllUsers",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  // console.log(data);

  return {
    users: data || [],
    isLoading,
    error,
    mutate,
  };
}

interface usersModelType {
  users: UserType[];
  setUsers: (users: UserType[]) => void;
}

const useUsersModel = create<usersModelType>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

export { useUsersModel };
