import { useSelector } from "react-redux";
import { ConfigProvider, Tabs } from "antd";
import Banner from "../../components/Banner";

const Profile = () => {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-6 text-white">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                cardBg: "#111827",
                colorBgContainer: "#111827",
                colorText: "#ffffff",
                colorTextHeading: "#ffffff",
                colorBorderSecondary: "#374151",
                itemSelectedColor: "#ffffff",
                itemHoverColor: "#9CA3AF",
              },
            },
          }}
        >
          <Tabs
            className="mt-6"
            type="card"
            size="large"
            items={[
              {
                label: "Account Information",
                key: "1",
                children: (
                  <div className="rounded-lg bg-gray-800 p-4">
                    <h3 className="mb-4 text-lg font-semibold">
                      Account Details
                    </h3>
                    {user && (
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <span className="w-24 font-medium">Account: </span>
                          {user.taiKhoan}
                        </p>
                        <p className="flex items-center">
                          <span className="w-24 font-medium">Name: </span>
                          {user.hoTen}
                        </p>
                        <p className="flex items-center">
                          <span className="w-24 font-medium">Email: </span>
                          {user.email}
                        </p>
                        <p className="flex items-center">
                          <span className="w-24 font-medium">Phone: </span>
                          {user.soDT}
                        </p>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                label: "Booking History",
                key: "2",
                children: (
                  <div className="rounded-lg bg-gray-800 p-4">
                    <h3 className="mb-4 text-lg font-semibold">
                      Your Bookings
                    </h3>
                    <p>Booking history will be displayed here</p>
                  </div>
                ),
              },
              {
                label: "Settings",
                key: "3",
                children: (
                  <div className="rounded-lg bg-gray-800 p-4">
                    <h3 className="mb-4 text-lg font-semibold">
                      Account Settings
                    </h3>
                    <p>Settings options will be displayed here</p>
                  </div>
                ),
              },
            ]}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default Profile;
