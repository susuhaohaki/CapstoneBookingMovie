import React from "react";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
  return (
    <>
      <div>AdminTemplate</div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminTemplate;
