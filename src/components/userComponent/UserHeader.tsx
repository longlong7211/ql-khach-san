import { ImMenu } from "react-icons/im";

export default function UserHeader() {
  return <>
    <div className="d-flex justify-content-between align-items-center" style={{ height: 70, backgroundColor: '#C39E78' }}>
      <div className="ms-5"><img height={50} src="https://inhongdang.vn/upload/images/logo-Twitter.png" alt="" /></div>
      <div className="me-3"><ImMenu size={40} /></div>
    </div>
  </>
}