"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { GiLargePaintBrush } from "react-icons/gi";
import { twMerge } from "tailwind-merge";
import { FaUpload } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { FaFileExport } from "react-icons/fa";
import { MdLabelOff } from "react-icons/md";
import { MdNewLabel } from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <ul className="menu bg-base-300 w-56 h-full">
        <li>
          <Link
            href={"/"}
            className={twMerge(pathname == "/" && "bg-base-100")}
          >
            <FaHome size={16} />
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/tool"}
            className={twMerge(pathname == "/tool" && "bg-base-100")}
          >
            <FaTools />
            Tool
          </Link>
          <ul>
            <li>
              <Link
                href={"/tool/upload"}
                className={twMerge(pathname == "/tool/upload" && "bg-base-100")}
              >
                <FaUpload /> Upload
              </Link>
            </li>
            <li>
              <Link
                href={"/tool/images"}
                className={twMerge(pathname == "/tool/images" && "bg-base-100")}
              >
                <IoIosImages /> Images
              </Link>
              <ul>
                <li>
                  <Link
                    href={"/tool/images/unlabeled"}
                    className={twMerge(
                      pathname == "/tool/images/unlabeled" && "bg-base-100"
                    )}
                  >
                    <MdLabelOff /> Unlabeled
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/tool/images/labeled"}
                    className={twMerge(
                      pathname == "/tool/images/labeled" && "bg-base-100"
                    )}
                  >
                    <MdNewLabel /> Labeled
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href={"/tool/labeling"}
                className={twMerge(
                  pathname == "/tool/labeling" && "bg-base-100"
                )}
              >
                <GiLargePaintBrush />
                Labeling
              </Link>
            </li>
            <li>
              <Link
                href={"/tool/export"}
                className={twMerge(pathname == "/tool/export" && "bg-base-100")}
              >
                <FaFileExport /> Export
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href={"/"}>
            <GiLargePaintBrush />
            Labeling
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
