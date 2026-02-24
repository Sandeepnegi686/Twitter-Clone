"use client";

import { useEffect } from "react";
import { getAllUsers } from "../_hooks/useUsers";
import Avatar from "./Avatar";

export default function FollowBar() {
  const { error, users, mutate, isLoading } = getAllUsers();

  // if (users.length === 0) return null;
  // useEffect(function () {
  //   mutate("/api/getAllUsers");
  // }, []);
  // console.log(users);
  // if (isLoading) return null;
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => {
            return (
              <div className="flex gap-4" key={user.id}>
                <Avatar userId="123" />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">Rahul</p>
                  <p className="text-neutral-400 text-sm">@rahul_negi</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
