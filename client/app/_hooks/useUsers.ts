import useSWR from "swr";
import { fetcher } from "../_lib/fetcher";
import { UserType } from "../types/UserType";

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

  return {
    users: data || [],
    isLoading,
    error,
    mutate,
  };
}
