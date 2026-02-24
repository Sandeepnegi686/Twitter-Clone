import useSWR from "swr";
import fetcher from "../_lib/fetcher";

export function getCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/getCurrentUser",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    currentUser: data || null,
    isLoading,
    error,
    mutate,
  };
}
