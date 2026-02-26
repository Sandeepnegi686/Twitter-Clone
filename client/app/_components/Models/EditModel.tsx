"use client";
import useLoginModel from "@/app/_hooks/useLoginModel";
import { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import RegisterModel from "./RegisterModel";
import useRegisterModel from "@/app/_hooks/useRegisterModel";
import API_BASE_URL, { api } from "@/app/_lib/api";
import axios from "axios";
import toast from "react-hot-toast";
// import { useAppContext } from "@/app/_context/appContext";
// import { getCurrentUser } from "@/app/_hooks/getCurrentUser";
import { mutate } from "swr";
import useUserModel from "@/app/_hooks/useUser";
import { UserType } from "@/app/types/UserType";
import useEditModel from "@/app/_hooks/useEditModel";
import ImageUpload from "../ImageUpload";

// interface LoginApiResponse {
//   success: boolean;
//   message: string;
//   user?: UserType;
// }

export default function LoginModel() {
  const { user } = useUserModel();
  const { onClose, isOpen } = useEditModel();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(
    function () {
      setProfileImage(user?.profileImage || "");
      setCoverImage(user?.coverImage || "");
      setName(user?.name || "");
      setUsername(user?.username || "");
      setBio(user?.bio || "");
    },
    [
      user?.profileImage,
      user?.coverImage,
      user?.name,
      user?.username,
      user?.bio,
    ],
  );

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.post("/", { profileImage, coverImage, name, username, bio });
      onClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload profile image"
      />
      <Input
        placeholder="Name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        type="text"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        type="text"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={onClose}
      body={bodyContent}
      onSubmit={onSubmit}
    />
  );
}
