import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <>
      <div>HomeTemplate</div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default HomeTemplate;
