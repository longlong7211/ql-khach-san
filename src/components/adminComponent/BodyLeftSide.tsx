import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiFamilyHouse } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdRoomService } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

export default function BodyLeftSide() {
  return <>
    <div className="body-left-item align-middle d-flex align-items-center">
      <FaHome className="mx-2" color="#19ADEE" />Phòng</div>
    <div className="body-left-item align-middle d-flex align-items-center">
      <HiMiniUserGroup className="mx-2" color="#19ADEE" />Khách hàng</div>
    <div className="body-left-item align-middle d-flex align-items-center">
      <MdRoomService className="mx-2" color="#19ADEE" />Dịch vụ</div>
    <div className="body-left-item align-middle d-flex align-items-center">
      <GiFamilyHouse className="mx-2" color="#19ADEE" />    Đặt phòng và hoá đơn</div>
    <div className="body-left-item align-middle d-flex align-items-center">
      <TbReportAnalytics className="mx-2" color="#19ADEE" />    Báo cáo & thống kê</div>
    <div className="body-left-item align-middle d-flex align-items-center">
      <FaPeopleGroup className="mx-2" color="#19ADEE" /> Nhân viên</div>
  </>
}