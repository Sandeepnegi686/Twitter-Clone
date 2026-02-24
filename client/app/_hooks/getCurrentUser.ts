import useSWR from "swr";
import fetcher from "../_lib/fetcher";
import { UserType } from "../types/UserType";

export function getCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR<UserType | null>(
    "/api/getCurrentUser",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  console.log(data);

  return {
    currentUser: data || null,
    isLoading,
    error,
    mutate,
  };
}
