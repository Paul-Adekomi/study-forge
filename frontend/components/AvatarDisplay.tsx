"use client";

import Image from "next/image";
import Avatar from "@/assets/image/default_Avatar.png";

export default function AvatarDisplay({ avatarUrl }: { avatarUrl?: string }) {
  return (
    <div className="w-12 h-12 border-2 border-primary rounded-full overflow-hidden relative group">
      <Image
        src={avatarUrl || Avatar}
        alt="avatar"
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>
  );
}
