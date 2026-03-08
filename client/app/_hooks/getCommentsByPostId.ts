import useSWR from "swr";
import { fetcher } from "../_lib/fetcher";

export function getComments(postId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/getCommentsByPostId/${postId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    comments: data || [],
    isLoading,
    error,
    mutate,
  };
}
