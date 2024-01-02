"use client";

import Sidebar from "./Sidebar";
import ThemeController from "./ThemeController";

const Header = ({ children }) => {
  return (
    <div className="h-screen">
      <header className="w-full h-[48px] flex items-center justify-end fixed bg-primary-content pr-2">
        <ThemeController />
      </header>
      <div className="h-[48px]" />
      <div className="flex h-full">
        <side>
          <Sidebar></Sidebar>
        </side>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default Header;
