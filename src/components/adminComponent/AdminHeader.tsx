import { FaBell } from "react-icons/fa";
import HeaderOption from "./HeaderOption";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  const [displayName, setDisplayName] = useState<string>("");
  useEffect(() => {
    setDisplayName(localStorage.getItem('app-name') || '')
  })
  return <>
    <div className="header-container d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <div className="header-app-logo">Nhà khách Lạc Hồng</div>
        <HeaderOption listOption={[{ key: 1, value: 'Quản lý' }, { key: 2, value: 'Khách sạn' }, { key: 3, value: 'Nhà hàng' }, { key: 4, value: 'Karaoke' }]} />
      </div>
      <div className="d-flex align-items-center gap-3">
        <FaBell size={30} color="#fff" />
        <FaLocationDot size={30} color="#fff" />
        <img className="rounded-circle" width={50} height={50} src="https://ibiettuot.com/wp-content/uploads/2021/10/avatar-mac-dinh.png" alt="" />
        <div className="header-user-name">{displayName}</div>
      </div>
    </div>
  </>
}