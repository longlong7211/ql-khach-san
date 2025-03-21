import { useEffect, useState } from "react";
import RoomView from "./RoomViewComponent";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { TRoom } from "../userComponent/ListRoom";
import apiService from "@/services/axiosClient";

export enum ERoomStatus {
  available, booked, maintenance
}
export type TRoomData = {
  roomNumber: string;
  thumbnail: string;
  size: number;
  beds: number;
  guests: number;
  price: number;
  status: number;
  hotel: any;
  roomType: any;
  bookings: [];
  categories: [];
  images: string[];
  id: number;
  createdAt: string
  updatedAt: string;
}

export default function BodyRightSide() {
  const [listRoom, setListRoom] = useState<TRoom[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getRoom()
  }, [])
  async function getRoom() {
    setLoading(true);
    try {
      const res = await apiService.get(`RoomType?PageNumber=1&PageSize=100&Depth=1`)
      setListRoom(res.items)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  if (isLoading) { return <div className="text-center mt-3"><Spin size="large" />;</div> }
  else {
    return <>
      {listRoom.length > 0 ? <RoomView reloadData={getRoom} roomData={listRoom} /> : <Spin style={{ color: "white" }} indicator={<LoadingOutlined spin />} size="small" />}
    </>
  }
}