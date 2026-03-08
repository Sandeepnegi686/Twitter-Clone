import useSWR from "swr";
import { fetcher } from "../_lib/fetcher";

export function getAllPosts(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/getPosts/${userId}` : "/api/getPosts",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    posts: data || [],
    isLoading,
    error,
    mutate,
  };
}
