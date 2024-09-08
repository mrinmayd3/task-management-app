import { UserCircleIcon } from "@heroicons/react/24/outline";
import UserInfoSkeleton from "./UserInfoSkeleton";
import { useAuth } from "../contexts/AuthContext";

export default function UserInfo() {
  const { user, isPending, isError, error } = useAuth();

  if (isPending) return <UserInfoSkeleton />;

  if (isError) return <p>An error has occurred: {error?.message}</p>;

  return (
    <div className="flex items-center gap-4 my-4">
      <UserCircleIcon className="size-12" />
      <div>
        <h3 className="text-2xl">{user?.username}</h3>
        <p className="text-gray-700">{user?.email}</p>
      </div>
    </div>
  );
}
