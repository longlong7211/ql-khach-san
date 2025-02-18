import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import '@/styles/auth/login.css';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  function onLoginPress() {
    axios.post('http://localhost:3000/api/login-api', { "username": user, "password": password })
      .then(function (response) {
        if (response.data.token !== '') {
          router.push('/')
        } else {
          alert("Đăng nhập thất bại!!")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return <>
    <div className="root-login-page d-flex align-items-center justify-content-center">
      <div className="container-login-form d-flex flex-column align-items-center">
        <div className="login-title my-4">ĐĂNG NHẬP</div>
        <div className="input-group mb-3">
          <span className="input-group-text"><FaUser /></span>
          <input onChange={(event) => {
            setUser(event.target.value);
          }} type="text" className="form-control" placeholder="Tài khoản" aria-label="Tai-khoan" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" ><GoShieldLock /></span>
          <input onChange={(event) => {
            setPassword(event.target.value)
          }} type="password" className="form-control" placeholder="Mật Khẩu" aria-label="Mat-khau" aria-describedby="basic-addon1" />
        </div>
        <div className="form-check login-check-remmenber">
          <input className="form-check-input" type="checkbox" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Ghi nhớ tài khoản.
          </label>
          <Link href={''}>Quên mật khẩu?</Link>
        </div>
        <button onClick={onLoginPress} type="button" className="btn btn-info my-4">Đăng nhập</button>
        <div>
          <Link href={'/auth/register'}>Đăng ký tài khoản</Link>
        </div>
      </div>
    </div>
  </>
}