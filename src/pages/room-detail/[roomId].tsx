import UserHeader from "@/components/userComponent/UserHeader";
import { Carousel, DatePicker, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router"
import { BsFillPeopleFill, BsTextareaResize } from "react-icons/bs";
import { IoBed } from "react-icons/io5";
import { TbAirConditioning, TbTournament } from "react-icons/tb";
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TRoom } from "@/components/userComponent/ListRoom";
import { PiPicnicTableBold, PiSpeakerSlashBold } from "react-icons/pi";
import { FaBottleWater } from "react-icons/fa6";
import { GiSlippers, GiWaterTank } from "react-icons/gi";

export default function RoomDetails() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<TRoom | null>(null);
  const [extraService, setExtraService] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(router.query.e as string);
  const adult = Number(router.query.a) || 0;
  const children = Number(router.query.c) || 0;
  const [people, setPeople] = useState<number>(0)
  const [room, setRoom] = useState<number>(0);
  const [servicePrice, setServicePrice] = useState<number>(0)
  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const numberOfDate = dayjs(endDate, 'DD-MM-YYYY').diff(dayjs(startDate, 'DD-MM-YYYY'), 'day')
    setTotalPrice((roomData?.pricePerNight || 0 * numberOfDate) + servicePrice)
  }, [servicePrice, room, startDate, endDate, roomData?.pricePerNight])
  useEffect(() => {
    setLoading(true);
    (async () => {
      if (router.query.roomId) {
        setStartDate(router.query.s as string);
        setEndDate(router.query.e as string)
        setRoom(Number(router.query.r))
        try {
          const romRes = await axios.get(`https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType/${router.query.roomId}?depth=1`);
          console.log('room detail: ', romRes.data)
          setTotalPrice(romRes.data.pricePerNight * room)
          setRoomData(romRes.data);
          const serviceRes = await axios.get('https://hotelmanagementapi20250217124648.azurewebsites.net/api/Service?PageNumber=1&PageSize=50&Depth=0');
          console.log(serviceRes.data)
          setExtraService(serviceRes.data.result.items)
        } catch (error) {

        } finally {
          setLoading(false)
        }
      }
    })()
  }, [router.query.roomId])
  const contentStyle: React.CSSProperties = {
    margin: 0,
    // height: '500px',
    objectFit: 'fill',
    width: "100%",
    height: '100%',
    maxHeight: 600
  };
  function renderIcon(id: number) {
    switch (id) {
      case 16:
        return <PiSpeakerSlashBold size={20} />
      case 17:
        return <PiPicnicTableBold size={20} />
      case 21:
        return <FaBottleWater size={20} />
      case 23:
        return <GiWaterTank size={20} />
      case 34:
        return <TbAirConditioning size={20} />
      case 35:
        return <GiSlippers size={20} />
      default:
        return <TbTournament size={20} />
    }
  }
  async function handleBooking() {
    try {
      const bookingRes = await axios.post('', {
        notes: noteRef.current?.value || '',
        adults: Number(router.query.a),
        children: Number(router.query.c),
        arrivalTime: '14:00',
        checkInDate: dayjs(startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        checkOutDate: dayjs(endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        basePrice: totalPrice,
        userId: 0,
        bookingRoomTypes: [
          {
            roomTypeId: roomData?.id || 1,
            fullName: 'Long Ho',
            email: "longhnh@lhu.edu.vn"
          }
        ]
      })
    } catch (error) {

    }
  }
  if (isLoading) { return <div className="text-center mt-3"><Spin size="large" />;</div> }
  else {
    return <>
      <UserHeader />
      <div className="container">
        <h1 className="text-center"> Detail of room {roomData?.name}</h1>
        <div className="room-headert">
          <div className="position-relative">
            <Carousel arrows infinite={true} autoplay>
              <div>
                <img style={contentStyle} src={`https://hotelmanagementapi20250217124648.azurewebsites.net/${roomData?.thumbnail}`} alt="" />
              </div>
              {roomData?.Images.map((img) => {
                return <div>
                  <img style={contentStyle} src={`https://hotelmanagementapi20250217124648.azurewebsites.net/${img}`} alt="" />
                </div>
              })}
            </Carousel>
            <div className="position-absolute d-flex" style={{ background: 'white', padding: '5px 10px', left: 20, bottom: 20, borderRadius: 3, fontSize: 30, fontWeight: 'bold' }}>{roomData?.pricePerNight}$</div>
          </div>
          <div className="d-flex justify-content-around align-items-center py-2">
            <div><BsTextareaResize /> {roomData?.sizes}m²</div>
            <div><BsFillPeopleFill /> {roomData && (roomData.doubleBed * 2 + roomData.singleBed)} {roomData && (roomData.doubleBed * 2 + roomData.singleBed) > 1 ? "Guests" : "Guest"}</div>
            <div><IoBed /> {roomData && roomData.doubleBed + roomData.singleBed} {roomData && roomData.doubleBed + roomData.singleBed > 1 ? "Beds" : "Bed"}</div>
          </div>
          <div style={{ fontSize: 35, fontWeight: 'bold' }}>{roomData?.name}</div>
          <div className="py-2" >
            {roomData?.description}
          </div>
        </div>
        <hr />
        <div className="rom-amenities">
          <h1>Amentities</h1>
          <div className="row">
            {roomData?.amenities.map((amenity: any) => {
              return <div className="col-6">
                <div className="mt-2 d-flex align-items-center">
                  {
                    renderIcon(amenity.id)
                  }
                  <span className="ms-2">{amenity.name}</span>
                </div>
              </div>
            })}
          </div>
        </div>
        <hr />
        <div className="house-rule">
          <h1>House rules</h1>
          <div>
            checkin: 14:00 - checkout: 12:00
          </div>
          <div>
            No smoking
          </div>
          <div>
            Only one car
          </div>
        </div>
        <hr />
        <div className="booking" style={{ background: '#D9DAE0', padding: 50 }}>
          <h1 className="text-center">Booking this room?</h1>
          <div>
            <div className="form-label">Chekin</div>
            <DatePicker size="large" style={{ width: '100%' }} onChange={(date, dateString) => { setStartDate(dayjs(date).format("DD-MM-YYYY").toString()) }} defaultValue={startDate && dayjs(startDate, 'DD-MM-YYYY')} />
          </div>
          <div className="mt-3">
            <div className="form-label">checkout</div>
            <DatePicker size="large" style={{ width: '100%' }} onChange={(date, dateString) => { setEndDate(dayjs(date).format("DD-MM-YYYY").toString()) }} defaultValue={dayjs(endDate, "DD-MM-YYYY")} />
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">Room</label>
              <div className="input-group">
                <input value={room} min={0} type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" onChange={(e) => {
                  const value = e.target.value;
                  setRoom(Number(value) || 0);
                }} />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">Guest</label>
              <div className="input-group">
                <input min={0} value={adult + children} type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" onChange={(e) => {
                  setPeople(Number(e.target.value))
                }} />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <div className="input-group">
                <textarea ref={noteRef} className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" />
              </div>
            </div>
          </div>
          <h3>Extra Services</h3>
          {extraService && extraService.map((service: any) => {
            return <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(value) => {
                if (value.target.checked) {
                  setServicePrice(prev => prev + service.price)
                } else {
                  setServicePrice(prev => prev - service.price)
                }
              }} />
              <div className="form-check-label d-flex justify-content-between" >
                <div>{service.name}</div>
                <div>{service.price}</div>
              </div>
            </div>
          })}

          <hr />
          <div>
            <h3>Price: {totalPrice.toFixed(2)}$</h3>
          </div>
          <button onClick={handleBooking} style={{ background: '#198139', width: '100%', height: 50, fontSize: 20, fontWeight: 'bold', border: 'none', borderRadius: 5 }}>Booking now</button>
        </div>
      </div>
    </>
  }
}