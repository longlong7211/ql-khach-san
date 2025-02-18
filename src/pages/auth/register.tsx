import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import '@/styles/auth/register.css';
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";

export default function RegisterPage() {
  return <>
    <div className="root-register-page d-flex align-items-center justify-content-center">
      <div className="container-register-form d-flex flex-column align-items-center">
        <div className="register-title mb-3">ĐĂNG KÝ</div>
        {/* ô nhập tài khoản */}
        <div className="input-group mb-3">
          <span className="input-group-text"><FaUser /></span>
          <input type="text" className="form-control" placeholder="Tài khoản" aria-label="Tai-khoan" aria-describedby="basic-addon1" />
        </div>
        {/* ô nhập mật khẩu */}
        <div className="input-group mb-3">
          <span className="input-group-text" ><GoShieldLock /></span>
          <input type="password" className="form-control" placeholder="Mật Khẩu" aria-label="Mat-khau" aria-describedby="basic-addon1" />
        </div>
        {/* ô nhập lại mật khẩu */}
        <div className="input-group mb-3">
          <span className="input-group-text" ><GoShieldLock /></span>
          <input type="password" className="form-control" placeholder="Nhập lại mật Khẩu" aria-label="Nhap-lai-mat-khau" aria-describedby="basic-addon1" />
        </div>
        {/* nhập email */}
        <div className="input-group mb-3">
          <span className="input-group-text"><MdEmail /></span>
          <input type="text" className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
        </div>
        {/* nhập số điện thoại */}
        <div className="input-group mb-3">
          <span className="input-group-text"><FaPhoneFlip /></span>
          <input type="text" className="form-control" placeholder="Số điện thoại" aria-label="so-dien-thoai" aria-describedby="basic-addon1" />
        </div>
        <button type="button" className="btn btn-info my-4">Đăng ký</button>
        <div>
          <Link href={'/auth/login'}>Đã có tài khoản? Đăng nhập</Link>
        </div>
      </div>
    </div>
  </>
}