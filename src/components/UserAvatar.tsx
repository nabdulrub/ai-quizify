

import React from "react";
import { User } from "next-auth";
import { Avatar } from "./ui/avatar";
import Image from "next/image";

type Props = {
  user: Pick<User, "image" | "name">;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="profile image"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <span className="sr-only">{user?.name}</span>
      )}
    </Avatar>
  );
};

export default UserAvatar;
