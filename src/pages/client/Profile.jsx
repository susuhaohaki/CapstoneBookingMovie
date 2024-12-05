import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <div className="container mx-auto px-4 py-6 text-white">
      <div className="flex flex-col items-center">
        <h2>Profile</h2>
        {user && (
          <div>
            <p>Account: {user.taiKhoan}</p>
            <p>Name: {user.hoTen}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.soDT}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
