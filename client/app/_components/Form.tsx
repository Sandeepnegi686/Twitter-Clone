"use client";
import { useCallback, useState } from "react";
import useLoginModel from "../_hooks/useLoginModel";
import useRegisterModel from "../_hooks/useRegisterModel";
import useUserModel from "../_hooks/useUser";
import toast from "react-hot-toast";
import { api } from "../_lib/api";
import { PostType } from "../types/PostType";
import Button from "./Button";
import Avatar from "./Avatar";
import { CommentType } from "../types/CommentType";

interface PostCreateResponse {
  success: boolean;
  message: string;
  post?: PostType;
}
interface CommentResponseType {
  success: boolean;
  message: string;
  comment?: CommentType;
}

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

export default function Form({ placeholder, isComment, postId }: FormProps) {
  const registerModal = useRegisterModel();
  const loginModel = useLoginModel();
  const { user } = useUserModel();
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      if (isComment) {
        const { data } = await api.post<CommentResponseType>(
          "/api/v1/comment/create",
          { body, postId },
        );
        if (data.success) {
          toast.success("Comment created");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await api.post<PostCreateResponse>(
          "/api/v1/post/create",
          { body },
        );
        if (data.success) {
          toast.success("Post created");
        } else {
          toast.error(data.message);
        }
      }
      setBody("");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, postId]);

  return (
    <div className="border-b border-neutral-800 px-5 py-2">
      {user ? (
        <div className="flex gap4">
          <div>
            <Avatar
              userId={user?._id}
              profileImage={user?.profileImage || ""}
            />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              cols={2}
              rows={2}
              className="disabled:opacity-80 peer resize-none mt-3 pl-2 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-1 w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                label="Tweet"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModel.onOpen} />
            <Button label="Regiter" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
}
