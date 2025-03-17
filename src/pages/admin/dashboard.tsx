import AdminBody from "@/components/adminComponent/AdminBody";
import AdminHeader from "@/components/adminComponent/AdminHeader";
import { useRouter } from "next/router";
import { useEffect } from "react"
const role = "admin";
export default function AdminDashboard() {
  //Lấy token từ local store token
  // 1. có token => lấy thông tin user từ server lưu lại tiếp tục
  // 2. không có token hoặc token sai => trả về login hoặc home
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // gọi api lấy thông tin
      // username=admin, display name= Nguyễn Văn A, role=admin
      localStorage.setItem('app-user', 'admin');
      localStorage.setItem('app-name', 'Nguyễn Văn A');
      localStorage.setItem('app-role', 'admin');
      if (role !== "admin") {
        router.push('/auth/login');
      }
    } else {
      // trả về login
      router.push('/auth/login');
    }
  })

  return <>
    <AdminHeader />
    <AdminBody />
  </>
}