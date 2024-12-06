/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { ConfigProvider, Tabs, List, Empty } from "antd";
import { useEffect, useState } from "react";
import { getHeThongRapAPI } from "../../store/reducers/quanLyRapReducer";
import Banner from "../../components/Banner";
import axios from "axios";

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
      <p className="font-semibold text-white">{name}</p>
      <p className="text-sm text-gray-400">{address}</p>
    </div>
  </div>
);

const BookingPane = ({ user, heThongRap, getCumRapApi }) => {
  const bookingHistory = user?.thongTinDatVe || [];
  const [cumRap, setCumRap] = useState({});

  useEffect(() => {
    const fetchTheaterData = async () => {
      if (!user?.thongTinDatVe?.length) return;
      // lay maHeThongRap tu danh sach thong tin dat ve
      const maHeThongRaps = [
        ...new Set(
          user.thongTinDatVe.map(
            (booking) => booking.danhSachGhe[0]?.maHeThongRap,
          ),
        ),
      ].filter(Boolean);
      // fetch cumRap theo maHeThongRap
      const cumRapData = {};
      for (const maHeThongRap of maHeThongRaps) {
        const data = await getCumRapApi(maHeThongRap);
        if (data) {
          cumRapData[maHeThongRap] = data;
        }
      }
      setCumRap(cumRapData);
    };

    fetchTheaterData();
  }, [user?.thongTinDatVe, getCumRapApi]);

  const getTheaterInfo = (seat) => {
    const theater = heThongRap.find(
      (rap) => rap.maHeThongRap === seat.maHeThongRap,
    );
    const cumRapList = cumRap[seat.maHeThongRap] || [];
    const theaterBranch = cumRapList.find((rap) =>
      rap.tenCumRap.includes(seat.tenHeThongRap),
    );
    return {
      logo: theater?.logo,
      name: theaterBranch?.tenCumRap,
      address: theaterBranch?.diaChi,
    };
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6">
      <h3 className="mb-6 text-xl font-semibold">Your Bookings</h3>
      <ConfigProvider theme={THEME.pagination}>
        <List
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

const SettingsPane = () => (
  <div className="rounded-lg bg-gray-800 p-6">
    <h3 className="mb-6 text-xl font-semibold">Account Settings</h3>
    <p>Settings options will be displayed here</p>
  </div>
);

const tabItems = (user, heThongRap, getCumRapApi) => [
  {
    label: "Account Information",
    key: "1",
    children: <AccountInfoPane user={user} />,
  },
  {
    label: "Booking History",
    key: "2",
    children: (
      <BookingPane
        user={user}
        heThongRap={heThongRap}
        getCumRapApi={getCumRapApi}
      />
    ),
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
  const dispatch = useDispatch();

  const getCumRapApi = async (maHeThongRap) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        {
          headers: {
            "Content-Type": "application/json",
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getHeThongRapAPI());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-6 text-white">
        <ConfigProvider theme={THEME.tabs}>
          <Tabs
            className="mt-6"
            type="card"
            size="large"
            items={tabItems(user, heThongRap, getCumRapApi)}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default Profile;
