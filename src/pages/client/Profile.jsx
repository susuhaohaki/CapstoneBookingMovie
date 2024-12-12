import { useSelector, useDispatch } from "react-redux";
import { ConfigProvider, Tabs, List, Empty } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getHeThongRapAPI,
  getCumRapAPI,
} from "../../store/reducers/quanLyRapReducer";
import Banner from "../../components/Banner";
import { useGetProfileQuery } from "../../services/authService";
const THEME = {
  tabs: {
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
  },
  pagination: {
    components: {
      Pagination: {
        colorText: "#ffffff",
        colorBgContainer: "#1f2937",
        colorBorder: "#374151",
        colorPrimary: "#ffffff",
        colorPrimaryHover: "#9CA3AF",
        colorTextDisabled: "#6B7280",
        controlItemBgActive: "#374151",
        controlItemBgActiveHover: "#4B5563",
      },
    },
  },
};

const AccountInfoPane = ({ user }) => {
  if (!user) return null;

  const infoFields = [
    { label: "Account", value: user.taiKhoan },
    { label: "Name", value: user.hoTen },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.soDT },
  ];

  return (
    <div className="rounded-lg bg-gray-800 p-6">
      <h3 className="mb-6 text-xl font-semibold">Account Details</h3>
      <div className="space-y-4">
        {infoFields.map(({ label, value }) => (
          <p key={label} className="flex items-center">
            <span className="w-24 font-medium">{label}: </span>
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

AccountInfoPane.propTypes = {
  user: PropTypes.shape({
    taiKhoan: PropTypes.string,
    hoTen: PropTypes.string,
    email: PropTypes.string,
    soDT: PropTypes.string,
  }),
};

const TheaterInfo = ({ logo, name, address }) => (
  <div className="flex flex-wrap items-center gap-3">
    {logo && (
      <img
        src={logo}
        alt="Theater Logo"
        className="h-8 w-8 rounded-full object-contain"
      />
    )}
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-400">{address}</p>
    </div>
  </div>
);

TheaterInfo.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
};

const BookingPane = ({ user, heThongRap }) => {
  const bookingHistory = user?.thongTinDatVe || [];
  const [cumRap, setCumRap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const fetchTheaterData = async () => {
      if (!user?.thongTinDatVe?.length) {
        setIsLoading(false);
        return;
      }

      try {
        const maHeThongRaps = [
          ...new Set(
            user.thongTinDatVe.map(
              (booking) => booking.danhSachGhe[0]?.maHeThongRap,
            ),
          ),
        ].filter(Boolean);

        const cumRapData = {};
        await Promise.all(
          maHeThongRaps.map(async (maHeThongRap) => {
            const result = await dispatch(getCumRapAPI(maHeThongRap));
            if (result.payload && mounted) {
              cumRapData[maHeThongRap] = result.payload;
            }
          }),
        );

        if (mounted) {
          setCumRap(cumRapData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching theater data:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    if (heThongRap?.length > 0) {
      fetchTheaterData();
    }

    return () => {
      mounted = false;
    };
  }, [user?.thongTinDatVe, dispatch, heThongRap]);

  const getTheaterInfo = (seat) => {
    if (!heThongRap?.length || !seat?.maHeThongRap) {
      return { logo: "", name: "", address: "" };
    }

    const theater = heThongRap.find(
      (rap) => rap.maHeThongRap === seat.maHeThongRap,
    );
    const cumRapList = cumRap[seat.maHeThongRap] || [];
    const theaterBranch = cumRapList.find((rap) =>
      rap.tenCumRap.includes(seat.tenHeThongRap),
    );

    return {
      logo: theater?.logo || "",
      name: theaterBranch?.tenCumRap || seat.tenHeThongRap || "",
      address: theaterBranch?.diaChi || "",
    };
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6">
      <h3 className="mb-6 text-xl font-semibold">Your Bookings</h3>
      <ConfigProvider theme={THEME.pagination}>
        <List
          loading={isLoading}
          itemLayout="vertical"
          size="large"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-gray-400">No bookings found</span>
                }
              />
            ),
          }}
          pagination={{
            pageSize: 5,
            className: "!text-white",
          }}
          dataSource={bookingHistory}
          renderItem={(booking) => {
            const theaterInfo = getTheaterInfo(booking.danhSachGhe[0]);
            return (
              <List.Item
                className="cursor-pointer !border-gray-700 hover:!bg-gray-700/30"
                extra={
                  <img
                    className="h-48 w-32 rounded-lg object-cover shadow-lg ring-1 ring-gray-700"
                    alt={booking.tenPhim}
                    src={booking.hinhAnh}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <div className="mb-4 flex flex-wrap justify-center gap-3 md:justify-normal">
                      <h2 className="rounded bg-blue-500 px-3 py-1.5 text-lg font-semibold text-white ring-1 ring-blue-500">
                        {booking.tenPhim}
                      </h2>
                      <p className="rounded bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-7 text-white ring-1 ring-orange-500">
                        Thời lượng: {booking.thoiLuongPhim} phút
                      </p>
                    </div>
                  }
                  description={
                    <div className="space-y-4 text-gray-300">
                      <TheaterInfo {...theaterInfo} />
                      <div className="grid gap-2 sm:grid-cols-2">
                        <p>
                          <span className="font-medium">Ngày đặt </span>
                          {new Date(booking.ngayDat).toLocaleDateString(
                            "vi-VN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            },
                          )}
                        </p>
                        <p className="font-medium">
                          <span className="font-bold text-orange-500">
                            Giá:{" "}
                          </span>
                          {booking.giaVe.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-orange-500">
                            Ghế:{" "}
                          </span>
                          {booking.danhSachGhe.map((seat, index) => (
                            <span
                              key={index}
                              className="inline-block rounded-md bg-gray-700 px-2 py-1 text-sm"
                            >
                              {seat.tenGhe}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      </ConfigProvider>
    </div>
  );
};

BookingPane.propTypes = {
  user: PropTypes.shape({
    thongTinDatVe: PropTypes.arrayOf(
      PropTypes.shape({
        danhSachGhe: PropTypes.arrayOf(
          PropTypes.shape({
            maHeThongRap: PropTypes.string,
            tenHeThongRap: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
  heThongRap: PropTypes.arrayOf(
    PropTypes.shape({
      maHeThongRap: PropTypes.string,
      logo: PropTypes.string,
    }),
  ),
};

const SettingsPane = () => (
  <div className="rounded-lg bg-gray-800 p-6">
    <h3 className="mb-6 text-xl font-semibold">Account Settings</h3>
    <p>Settings options will be displayed here</p>
  </div>
);

const tabItems = (user, heThongRap) => [
  {
    label: "Account Information",
    key: "1",
    children: <AccountInfoPane user={user} />,
  },
  {
    label: "Booking History",
    key: "2",
    children: <BookingPane user={user} heThongRap={heThongRap} />,
  },
  {
    label: "Settings",
    key: "3",
    children: <SettingsPane />,
  },
];

const Profile = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { heThongRap } = useSelector((state) => state.quanLyRapReducer);
  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heThongRap?.length) {
      dispatch(getHeThongRapAPI());
    }
  }, [dispatch, heThongRap]);

  if (isProfileLoading) {
    return (
      <div className="container mx-auto px-4 py-6 text-white">
        <div className="flex items-center justify-center">
          <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200"></div>
        </div>
      </div>
    );
  }

  if (!user && !profileData?.content) {
    return (
      <div className="container mx-auto px-4 py-6 text-white">
        <div className="flex items-center justify-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-400">
                Please login to view your profile
              </span>
            }
          />
        </div>
      </div>
    );
  }

  const userData = profileData?.content || user;

  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-6 text-white">
        <ConfigProvider theme={THEME.tabs}>
          <Tabs
            className="mt-6"
            type="card"
            size="large"
            items={tabItems(userData, heThongRap)}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default Profile;
