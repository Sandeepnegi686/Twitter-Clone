"use client";
import Header from "../_components/Header";
import UserHero from "../_components/UserHero";
import UserBio from "../_components/UserBio";
import useUserModel from "../_hooks/useUser";

export default function Page() {
  const { user } = useUserModel();

  return (
    <div className="">
      {/* <Header label={user?.name} showBackArrow />
      <UserHero userId={user?._id as string} />
      <UserBio userId={user?._id as string} /> */}
    </div>
  );
}
