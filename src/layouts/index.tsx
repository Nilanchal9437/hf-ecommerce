"use client";

import * as React from "react";

import Link from "next/link";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";

import type { LayoutType } from "@/layouts/types";

import SideBar from "@/layouts/sideBar";
import logout from "@/layouts/apis/logout";

function MainLayout({ children, user }: LayoutType) {
  return (
    <div className="flex">
      <div
        className={`${
          true ? "w-[256px] block" : "hidden"
        } bg-info text-gray-500 h-[100vh] flex-shrink-0 transition-all ease-in-out duration-300 shadow-md`}
      >
        <div className="flex gap-2 items-center p-2 text-center max-h-[10vh] h-full">
          <Link href="/">
            HF - Ecommerce
            {/* <Image height={50} width={200} src="/images/logo.svg" alt="logo" /> */}
          </Link>
        </div> 
        <div className="max-h-[80vh] h-full">
          <div className="mx-2">
            <div className="border-t border-gray-500 mb-2"></div>
          </div>
          <SideBar />
        </div>
        <div className="bottom-0 left-0 w-full p-2 max-h-[10vh] h-full">
          <div className="border-t border-gray-500 mb-2"></div>
          <button
            onClick={async () => {
              await logout();
            }}
            className="w-full flex items-center justify-between bg-secondary text-black py-2 px-4 rounded-md cursor-pointer"
          >
            <div className="flex items-center">
              <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-black">
                {user?.email[0]?.toUpperCase() || "X"}
              </div>
              <span className="text-sm truncate">
                {(user?.email || "").substring(0, 18)}...
              </span>
            </div>
            <div className="ml-2">
              <IoIosLogOut className="text-black" />
            </div>
          </button>
        </div>
      </div>
      <main className="flex-grow p-4 max-h-[100vh] overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
