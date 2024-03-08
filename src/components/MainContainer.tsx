import React from "react";

const MainContainer = ({ children }) => {
  return (
    <div className="flex items-center w-full justify-center   h-lvh overflow-scroll mt-0 pt-10">
      {children}
    </div>
  );
};

export default MainContainer;
