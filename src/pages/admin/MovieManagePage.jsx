import { Outlet } from "react-router-dom";

const MovieManagePage = () => {
  return (
    <div>
      <h1>MovieManagePage</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieManagePage;
