import { ClipLoader } from "react-spinners";
import Header from "@/app/_components/Header";
import UserBio from "@/app/_components/UserBio";
import UserHero from "@/app/_components/UserHero";
import { UserType } from "@/app/types/UserType";
import API_BASE_URL from "@/app/_lib/api";
import PostFeed from "@/app/_components/posts/PostFeed";

interface PageProps {
  params: {
    userId: string;
  };
}

async function getUserData(userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/user/${userId}`, {
    cache: "no-store", // Ensures SSR (no caching)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params;

  if (!userId) {
    return <div>User not found</div>;
  }

  const data = await getUserData(userId);

  const fetchedUser: UserType = data.user;
  const followersCount: number = data.followersCount;

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow />
      <UserHero
        userId={userId as string}
        profileImage={fetchedUser?.profileImage}
        coverImage={fetchedUser?.coverImage}
      />
      <UserBio
        userId={userId as string}
        fetchedUser={fetchedUser}
        followersCount={followersCount}
      />
      <PostFeed userId={userId} />
    </>
  );
}
