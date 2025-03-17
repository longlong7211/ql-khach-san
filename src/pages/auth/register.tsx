import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
// import '@/styles/auth/register.css';
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [rePwd, setRePwd] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  async function handleRegister() {
    setLoading(true);
    try {
      const res = await axios.post('https://hotelmanagementapi20250217124648.azurewebsites.net/api/Auth/signup', {
        email, password: pwd
      })
      if (res.status == 200) {
        // da tao dc tk -> chuyen huong den trang dang nhap
        router.push('/auth/login')
      }
    } catch (error: any) {
      alert(error.response.data.message)
    } finally {
      setLoading(false);
    }
  }
  return <>
    <div className="root-register-page d-flex align-items-center justify-content-center ">
      <div className="container-register-form d-flex flex-column align-items-center">
        <div className="register-title mb-3">ĐĂNG KÝ</div>
        {/* ô nhập tài khoản */}
        <div className="input-group mb-3">
          <span className="input-group-text"><FaUser /></span>
          <input onChange={(event) => { setEmail(event.target.value) }} type="text" className="form-control" placeholder="Email" aria-label="Tai-khoan" aria-describedby="basic-addon1" />
        </div>
        {/* ô nhập mật khẩu */}
        <div className="input-group">
          <span className="input-group-text" ><GoShieldLock /></span>
          <input onChange={(event) => { setPwd(event.target.value) }} type="password" className="form-control" placeholder="Mật Khẩu" aria-label="Mat-khau" aria-describedby="basic-addon1" />
        </div>
        {/* ô nhập lại mật khẩu */}
        <div className="input-group mt-3">
          <span className="input-group-text" ><GoShieldLock /></span>
          <input onChange={(event) => { setRePwd(event.target.value) }} type="password" className="form-control" placeholder="Nhập lại mật Khẩu" aria-label="Nhap-lai-mat-khau" aria-describedby="basic-addon1" />
        </div>
        {pwd && rePwd && (pwd !== rePwd) && <small style={{ color: "red", alignSelf: "flex-start" }}>Mật khẩu không khớp!</small>}
        {/* nhập email */}
        <div className="input-group mt-3">
          <span className="input-group-text"><MdEmail /></span>
          <input type="text" className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
        </div>
        {/* nhập số điện thoại */}
        <div className="input-group mt-3">
          <span className="input-group-text"><FaPhoneFlip /></span>
          <input type="text" className="form-control" placeholder="Số điện thoại" aria-label="so-dien-thoai" aria-describedby="basic-addon1" />
        </div>
        <button
          disabled={!(pwd.length > 7 && rePwd.length > 7 && pwd === rePwd && email.length > 5) || isLoading}
          type="button"
          onClick={handleRegister}
          className="btn btn-info my-4">Đăng ký {isLoading && <Spin style={{ color: "white" }} indicator={<LoadingOutlined spin />} size="small" />}</button>
        <div>
          <Link href={'/auth/login'}>Đã có tài khoản? Đăng nhập</Link>
        </div>
      </div>
    </div>
  </>
}