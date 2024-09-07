import { useQuery } from "@tanstack/react-query";
import { User } from "../types/User";
import { getUser } from "../api";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import UserInfoSkeleton from "./UserInfoSkeleton";

export default function UserInfo() {
  const { data, isPending, isError, error } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isPending) return <UserInfoSkeleton />;

  if (isError) return "An error has occurred: " + error.message;

  return (
    <div className="flex items-center gap-4 my-4">
      <UserCircleIcon className="size-12" />
      <div>
        <h3 className="text-2xl">{data?.username}</h3>
        <p className="text-gray-700">{data?.email}</p>
      </div>
    </div>
  );
}
