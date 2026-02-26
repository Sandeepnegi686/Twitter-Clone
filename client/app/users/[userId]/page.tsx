"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ClipLoader } from "react-spinners";

import Header from "@/app/_components/Header";
import UserBio from "@/app/_components/UserBio";
import UserHero from "@/app/_components/UserHero";
import useUserModel from "@/app/_hooks/useUser";
import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/_lib/api";
import { UserType } from "@/app/types/UserType";

function Page() {
  // const userId = params.userId;
  // console.log(params);
  // const router = useRouter();
  const searchParams = useParams();
  const userId = searchParams?.userId || " ";
  // console.log(searchParams);

  const { user } = useUserModel();

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={user?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
}

export default Page;
