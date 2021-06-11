import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useDetectOutsideClick } from "../utils/useDetectOutsideClick";

const DropDownMenu = ({ props }: any) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
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
      <nav
        ref={dropdownRef}
        className={`absolute transition-all ${
          isActive ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="list-none ml-8 bg-black w-full py-3 px-4 rounded-md">
          {props.route == "anläggningen" ? (
            <>
              <li>
                <Link href="/anläggningen/stallet">
                  <a
                    className={`${
                      props.minimized == true ? "text-sm" : "text-lg"
                    } uppercase`}
                  >
                    Stallet
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/anläggningen/lösdriften">
                  <a
                    className={`${
                      props.minimized == true ? "text-sm" : "text-lg"
                    } uppercase`}
                  >
                    Lösdriften
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/anläggningen/hagarna">
                  <a
                    className={`${
                      props.minimized == true ? "text-sm" : "text-lg"
                    } uppercase`}
                  >
                    Hagarna
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/anläggningen/ridbanan">
                  <a
                    className={`${
                      props.minimized == true ? "text-sm" : "text-lg"
                    } uppercase`}
                  >
                    Ridbanan
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/hästar/tävlingshästar">
                  <a
                    className={`${
                      props.minimized == true ? "text-sm" : "text-lg"
                    } uppercase`}
                  >
                    Tävlingshästar
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/hästar/unghästar">
                  <a
                    className={`${
                      props.minimized == true ? "text-sm" : "text-lg"
                    } uppercase`}
                  >
                    Unghästar
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/hästar/avelsto">
                  <a
                    className={`${
                      props.minimized == true ? "text-sm" : "text-lg"
                    } uppercase`}
                  >
                    Avelsto
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default DropDownMenu;
