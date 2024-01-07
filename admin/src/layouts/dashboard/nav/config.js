// component
import SvgColor from "~/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics")
  },
  {
    title: "Quản lý người dùng",
    path: "/dashboard/user",
    icon: icon("ic_user")
  },
  {
    title: "Quản lý chó",
    icon: icon("ic_dog"),
    path: "/dashboard/dog"
  },
  {
    title: "Quản lý sản phẩm cho chó",
    icon: icon("ic_product"),
    path: "/dashboard/dog-item"
  },
  {
    title: "Quản lý hóa đơn",
    icon: icon("ic_cart"),
    path: "/dashboard/invoice"
  },
  {
    title: "Quản lý phiếu giảm giá",
    icon: icon("ic_voucher"),
    path: "/dashboard/voucher"
  },
  {
    title: "Quản lý lịch hẹn khám",
    icon: icon("ic_booking"),
    path: "/dashboard/booking"
  }
];

export default navConfig;
