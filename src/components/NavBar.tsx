import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import navButtons from "../config/buttons";
import { useLogoutMutation, useUserQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NavButton from "./NavButton";

const NavBar = () => {
  const router = useRouter();
  const [minimized, setMinimized] = useState(false);
  const [logout] = useLogoutMutation();
  const { data, loading } = useUserQuery({
    skip: isServer(),
  });

  let body = null;

  // Data is loading
  if (loading) {
    // User is not logged in
  } else if (!data?.user) {
    // User is logged in
  } else {
    body = (
      <>
        <div
          onClick={async () => {
            await logout();
            router.reload();
          }}
          className="flex flex-col justify-around items-center h-full cursor-pointer ml-2 md:ml-8"
        >
          <span className={`transition-all ${minimized ? 'text-sm' : 'text-lg'} uppercase font-sans`}>
            Logga ut {data.user.username}
          </span>
        </div>
      </>
    );
  }

  const handleScroll = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 150) setMinimized(true);
    if (top < 150) setMinimized(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div
      className={`flex flex-row fixed transition-all z-30 bg-black ${
        minimized ? "bg-opacity-60 py-4" : "bg-opacity-100 py-10"
      }  w-full top-0`}
    >
      <div
        className={`transition-all ${
          minimized ? "h-10" : "h-20"
        } w-40 ml-10 z-40`}
      >
        <img
          src="/images/jemma_stables.png"
          className="transition-all filter grayscale invert"
          width={minimized ? 100 : 400}
          height={minimized ? 50 : 200}
          alt=""
        />
      </div>
      <div className="hidden flex-grow ml-2 md:ml-5 md:flex">
        {navButtons.map((button: any, idx: number) => {
          return (
            <NavButton
              key={button.label + "_" + idx}
              path={button.path}
              label={button.label}
              minimized={minimized}
              dropdown={button.dropdown}
              route={button.route}
            />
          );
        })}
        <>{body}</>
      </div>
    </div>
  );
};

export default NavBar;
