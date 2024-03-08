import MainContainer from "@/components/MainContainer";
import { NavButton } from "@/components/NavButton";
import SideBar from "@/components/SideBar";
import ThemeSwitch from "@/components/ThemeSwitch";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex w-full justify-between ">
        <SideBar>
          {" "}
          <div className="flex justify-between w-full ">
            <NavButton title="Volver" path="/" back={true} />

            <ThemeSwitch />
          </div>
        </SideBar>
        <MainContainer>sx</MainContainer>
      </div>
    </div>
  );
};

export default page;
