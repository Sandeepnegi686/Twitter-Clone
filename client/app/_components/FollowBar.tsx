import { useUsersModel } from "../_hooks/useUsers";
import Avatar from "./Avatar";

export default function FollowBar() {
  const { users } = useUsersModel();
  if (users.length === 0) return null;
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user) => {
            return (
              <div className="flex gap-4" key={user._id}>
                <Avatar userId={user._id} profileImage={user?.profileImage} />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">
                    {user?.name.length < 10
                      ? (user.name as string)
                      : `${user.name.split(" ")[0]}`}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    @
                    {user?.username.length < 10
                      ? (user.username as string)
                      : `${user.username.slice(0, 9)}..`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
