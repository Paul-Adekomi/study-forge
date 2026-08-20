"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import Avatar from "@/assets/image/default_Avatar.png";

export default function AvatarUpload({
  currentAvatarUrl,
}: {
  currentAvatarUrl?: string;
}) {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/me/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setAvatarUrl(data.avatar_url);
    } catch (err) {
      console.error("Avatar upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="w-12 h-12 border-2 border-primary rounded-full overflow-hidden relative group cursor-pointer"
      onClick={handleFileSelect}
    >
      <Image
        src={avatarUrl || Avatar}
        alt="avatar"
        width={48}
        height={48}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Camera size={16} className="text-white" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
