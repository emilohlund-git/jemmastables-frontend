import Link from "next/link";
import DropDownMenu from "./DropDownMenu";

const NavButton = (props: any) => {
  return (
    <>
      {props.dropdown == true ? (
        <DropDownMenu props={props} />
      ) : (
        <Link href={props.path}>
          <div className="flex flex-col text-white justify-around items-center h-full cursor-pointer ml-2 md:ml-8">
            <span
              className={`text-white transition-all ${
                props.minimized == true ? "text-sm" : "text-lg"
              } uppercase font-sans`}
            >
              {props.label}
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default NavButton;
