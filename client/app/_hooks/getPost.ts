import useSWR from "swr";
import { fetcher } from "../_lib/fetcher";

export function getPost(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/getPost/${userId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    post: data || [],
    isLoading,
    error,
    mutate,
  };
}
