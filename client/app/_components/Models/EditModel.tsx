"use client";
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

interface EditUserResponse {
  success: boolean;
  message: string;
  user: UserType;
}

export default function EditModel() {
  const { user, setUser } = useUserModel();
  const { onClose, isOpen } = useEditModel();

  const [isLoading, setIsLoading] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name!);
      formData.append("bio", bio!);
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (coverImageFile) formData.append("coverImage", coverImageFile);
      const { data } = await api.post<EditUserResponse>(
        "/api/v1/user/update-bio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setUser(data.user);
      toast.success("User updated successfully");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        preview={profileImagePreview}
        disabled={isLoading}
        onChange={(file: File, preivw: string) => {
          setProfileImageFile(file);
          setProfileImagePreview(preivw);
        }}
        label="Upload profile image"
      />
      <ImageUpload
        preview={coverImagePreview}
        disabled={isLoading}
        onChange={(file: File, preview: string) => {
          setCoverImageFile(file);
          setCoverImagePreview(preview);
        }}
        label="Upload Cover image"
      />
      <Input
        placeholder="Name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        type="text"
        onChange={(e) => setBio(e.target.value)}
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
