import { Carousel, Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillPeopleFill, BsTextareaResize } from "react-icons/bs";
import { IoBed } from "react-icons/io5";

export type TBookingData = {
  startDate: string;
  endDate: string;
  adult: number;
  child: number;
  room: number;
}
export type TRoom = {
  Images: string[],
  amenities: any;
  capacity: number;
  description: string;
  doubleBed: number;
  id: number;
  name: string;
  numberOfBathrooms: number;
  numberOfBeds: number;
  pricePerNight: number;
  rooms: any;
  singleBed: number;
  sizes: number;
  thumbnail: string;
}
export default function ListRoom({ startDate, endDate, adult, child, room }: TBookingData) {
  const [listRoom, setListRoom] = useState<TRoom[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await axios.get("https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType?PageNumber=1&PageSize=10&Depth=1")
      console.log(res.data)
      const listFilterData = res.data.items.filter((type: TRoom) => {

        return (type.doubleBed * 2 + type.singleBed >= adult) && (type.doubleBed >= child) && ((type.rooms.filter((room: any) => room.status === "Ready")).length >= room);
      })
      setListRoom(listFilterData)
      setLoading(false);
    })();
  }, [startDate, endDate, adult, child, room])
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '250px',
  };
  if (isLoading) { return <div className="text-center mt-3"><Spin size="large" />;</div> }
  else {
    return <div className="container justity-content-center mt-5">
      <div className="row">
        {listRoom.map((type: TRoom) => {
          return (<div key={type.id} className="col col-md-6 col-lg-4  d-flex justify-content-center">
            <div style={{ width: 300, marginTop: 30 }}>
              <div className="position-relative">
                <Carousel arrows infinite={true} autoplay>
                  {
                    type.Images.map((image: string) => {
                      return <div>
                        <img style={contentStyle} src={`https://hotelmanagementapi20250217124648.azurewebsites.net/${image}`} alt="" />
                      </div>
                    })
                  }
                </Carousel>
                <div className="position-absolute d-flex" style={{ background: 'white', padding: '5px 10px', left: 20, bottom: 20, borderRadius: 3 }}>{type.pricePerNight}$</div>
              </div>
              <div className="d-flex justify-content-around align-items-center py-2">
                <div><BsTextareaResize /> {type.sizes}m²</div>
                <div><BsFillPeopleFill /> {type.doubleBed * 2 + type.singleBed} {(type.doubleBed * 2 + type.singleBed) > 1 ? "Guests" : "Guest"}</div>
                <div><IoBed /> {type.doubleBed + type.singleBed} {type.doubleBed + type.singleBed > 1 ? "Beds" : "Bed"}</div>
              </div>
              <div style={{ fontSize: 24 }}>{type.name}</div>
              <div className="py-2" style={{ display: "-webkit-box", WebkitLineClamp: 3, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}>{type.description}</div>
              <Link href={`/room-detail/${type.id}?s=${startDate}&e=${endDate}&a=${adult}&c=${child}&r=${room}`}>View more</Link>
            </div>
          </div>)
        })}
      </div>
    </div>
  }
}