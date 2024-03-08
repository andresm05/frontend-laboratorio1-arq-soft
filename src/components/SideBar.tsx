import React from "react";

const SideBar = ({ children = null }) => {
  return (
    <div className="flex flex-col dark:bg-gray-900 p-8 bg-gray-100 rounded-lg justify-center w-1/5">
      {children}
    </div>
  );
};

export default SideBar;