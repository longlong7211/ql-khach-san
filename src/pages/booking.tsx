import ListRoom from "@/components/userComponent/ListRoom";
import UserHeader from "@/components/userComponent/UserHeader";
import { useSearchParams } from "next/navigation"

export default function BookingPage() {
  const param = useSearchParams();
  return <>
    <UserHeader />
    <h1 className="text-center">Thong tin phong</h1>
    <h3 className="text-center">{`Ngay bat dau: ${param.get('st')} - Ngay tra phong: ${param.get("et")} - Nguoi lon: ${param.get('a')} - Tre em: ${param.get('c')} - So phong: ${param.get('r')}`}</h3>
    <ListRoom startDate={param.get('st') || ""} endDate={param.get("et") || ""} adult={Number(param.get('a') || 0)} child={Number(param.get('c') || 0)} room={Number(param.get('r') || 0)} />
  </>
}