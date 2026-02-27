import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (file: File, preview: string) => void;
  label: string;
  preview?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  onChange,
  label,
  disabled,
  preview,
}: ImageUploadProps) {
  const handleChange = useCallback(
    function (file: File, preview: string) {
      onChange(file, preview);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    function (files: File[]) {
      const file = files[0];
      if (!file) return;
      const preview = URL.createObjectURL(file);
      handleChange(file, preview);
    },
    [handleChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDrop: handleDrop,
    disabled,
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="flex items-center justify-center">
          <Image src={preview} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
}
