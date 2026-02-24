import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
// import useUserModel from "../_hooks/useUser";
import { useRouter } from "next/navigation";
import { useAppContext } from "../_context/appContext";
// import { getCurrentUser } from "../_hooks/getCurrentUser";

export default function Sidebar() {
  const { user, setUser } = useAppContext();
  // const { currentUser, error } = getCurrentUser();
  // console.log(currentUser, error);

  const router = useRouter();
  const items = [
    { label: "Home", href: "/", icon: BsHouseFill },
    { label: "Notifications", href: "/notifications", icon: BsBellFill },
    { label: "Profile", href: "/users/123", icon: FaUser },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-57.5">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          {user && (
            <SidebarItem
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
                router.push("/api/logout");
              }}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
