import { Button, Card, Dropdown, Input, MenuProps, Modal, Spin } from "antd";
import { ERoomStatus, TRoomData } from "../BodyRightSide";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import HeaderOption from "../HeaderOption";
import { FaBed, FaHouse } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { TRoom } from "@/components/userComponent/ListRoom";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";

type TRoomType = {
  id: number;
  name: string;
}

export default function RoomView({ roomData, reloadData }: { roomData: TRoom[], reloadData: () => void }) {
  const [filterSelected, setFilter] = useState<number>(0);
  const [roomType, setRoomType] = useState<MenuProps['items']>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeSelected, setTypeSelected] = useState<TRoomType | null>(null);
  const [roomStatus, setRoomStatus] = useState<"Ready" | "Booked">("Ready");
  const [roomFloor, SetRoomFloor] = useState<{ room: string, floor: number, roomStatus: "" | "error" }>({ room: "", floor: 0, roomStatus: "" })
  const [isLoadingAddRoom, SetLoadingAddRoom] = useState<boolean>(false);
  const [roomTypeStatus, setRoomTypeStatus] = useState<boolean>(true);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [roomIdNeedEdit, setRoomIdNeedEdit] = useState<number>(-1);

  const handleOpenEditModal = async () => {
    const res = await axios.get('https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType?PageNumber=1&PageSize=50&Depth=0')
    setRoomType(res.data.items)
    const createListItem: MenuProps['items'] = res.data.items.map((item: any) => {
      return {
        key: item.id,
        label: (
          <div onClick={() => { setTypeSelected(item) }}>
            {item.name}
          </div>
        ),
      }
    })

    setRoomType(createListItem);
    setOpenEditModal(true);
  }
  const handleEditModalOk = async () => {
    try {
      const formData = new FormData();
      formData.append("HotelId", "0")
      formData.append("RoomTypeId", `${typeSelected?.id}`)
      formData.append("Status", roomStatus == "Ready" ? "1" : "2")
      const res = await axios.put(`https://hotelmanagementapi20250217124648.azurewebsites.net/api/Room/${roomIdNeedEdit}`, formData)
      if (res.status === 200) {
        alert("Sửa phòng thành công")
        reloadData()
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("Có lỗi xảy ra khi sửa phòng")
    }
  };
  const handleEditModalCancel = () => {
    setOpenEditModal(false);
  };

  const roomTypeItem: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div onClick={() => { setRoomStatus("Ready") }}>
          Ready
        </div>
      )
    },
    {
      key: 1,
      label: (
        <div onClick={() => { setRoomStatus("Booked") }}>
          Booked
        </div>
      )
    }
  ]
  const handleOpenModal = async () => {
    SetLoadingAddRoom(true)
    const res = await axios.get('https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType?PageNumber=1&PageSize=50&Depth=0')
    setRoomType(res.data.items)
    const createListItem: MenuProps['items'] = res.data.items.map((item: any) => {
      return {
        key: item.id,
        label: (
          <div onClick={() => { setTypeSelected(item) }}>
            {item.name}
          </div>
        ),
      }
    })

    setRoomType(createListItem);
    SetLoadingAddRoom(false)
    setIsModalOpen(true);
  }
  const handleOk = async () => {
    if (!roomFloor.room || !typeSelected) {
      !roomFloor.room && SetRoomFloor(prev => ({ ...prev, roomStatus: 'error' }))
      !typeSelected && setRoomTypeStatus(false);
      alert(`${roomFloor.room ? "" : "Vui lòng nhập số phòng"}\n${typeSelected ? "" : "Vui lòng chọn kiểu phòng"}`)
      return;
    }
    try {
      const formData = new FormData();
      formData.append("HotelId", "0")
      formData.append("RoomTypeId", `${typeSelected?.id}`)
      formData.append("RoomNumber", `${roomFloor.room}`)
      formData.append("Floor", `${roomFloor.floor}`)
      formData.append("Status", roomStatus == "Ready" ? "1" : "2")
      const res = await axios.post('https://hotelmanagementapi20250217124648.azurewebsites.net/api/Room', formData)
      if (res.status === 200) {
        alert("Thêm phòng thành công")
        reloadData()
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm phòng")
    }
  };
  const handleCancel = () => {
    SetRoomFloor({ room: "", floor: 0, roomStatus: '' })
    setIsModalOpen(false);
  };
  function handleEditRoom(id: number) {
    setRoomIdNeedEdit(id)
    handleOpenEditModal()
  }
  return <div className="romview-root">
    <div className="roomview-header d-flex align-items-center justify-content-between">
      <HeaderOption selected={setFilter} listOption={[{ key: 0, value: 'Tất cả phòng' }, { key: 1, value: 'Phòng trống' }, { key: 2, value: 'Phòng đầy' }, { key: 3, value: 'Phòng đang sửa' }]} />
      <div className="d-flex gap-4 ">
        <div style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
          {isLoadingAddRoom ? <Spin /> : <IoIosAddCircle size={30} />}
        </div>
        <div className="d-flex align-items-center"><FaHouse size={30} />
          {roomData.reduce((sum, item) => sum + item.rooms.length, 0)}
        </div>
        <div className="d-flex align-items-center"><FaHouse size={30} color="#7FFFD5" /> {roomData.reduce((sum, item) => sum + item.rooms.filter((item: any) => item.status == "Ready").length, 0)}</div>
        <div className="d-flex align-items-center"><FaBed size={30} color="#CD5D5D" />{roomData.reduce((sum, item) => sum + item.rooms.filter((item: any) => item.status == "Booked").length, 0)}</div>
      </div>
    </div>
    <div className="roomview-list-room">
      <div className="row">
        {roomData.map((type: TRoom) => {
          return <>
            {type.rooms.filter((room: any) => {
              if (filterSelected == 1) {
                return room.status === "Ready"
              } else if (filterSelected == 2) {
                return room.status === 'Booked'
              } else if (filterSelected == 3) {
                return room.status === "Mantainence"
              }
              return true;
            }).map((room: any) => {
              return <div className="col-3 px-3 py-3">
                <Card
                  key={room.id}
                  actions={[
                    <EditOutlined onClick={() => { handleEditRoom(room.id) }} key="edit" style={{ fontSize: 20 }} />,
                    <SettingOutlined key="setting" style={{ fontSize: 20 }} />,
                    <EllipsisOutlined key="ellipsis" style={{ fontSize: 20 }} />,
                  ]}
                  className={`${room.status == "Ready" ? "room-available" : room.status == "Booked" ? "room-booked" : room.status == "Asign_Clean" ? "room-clean" : room.status == "Mantainence" ? "room-mantainence" : "room-not-avalible"}`}>
                  <Card.Meta
                    title={`Room: ${room.roomNumber}`}
                    description={
                      <div style={{ color: "#000" }}>
                        <div>Type of room: {type.name}</div>
                        <div>Price: {`${type.pricePerNight}/day or ${room.pricePerHour}/hour`}</div>
                        <div>Status: {room.status}</div>
                        {/* <div>Desc: {room.description}</div> */}
                      </div>
                    }
                  />
                </Card>
              </div>
            })}
          </>
        })}
      </div>
    </div>
    <Modal title="Thêm phòng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div>
        <div>Kiểu phòng:
          <Dropdown menu={{ items: roomType }} placement="bottom" trigger={['click']}>
            <Button style={roomTypeStatus ? {} : { borderColor: 'red' }}>{typeSelected?.name || "Chọn loại phòng"}</Button>
          </Dropdown>
        </div>
        <div>Số phòng:
          <Input status={roomFloor.roomStatus} value={roomFloor.room} placeholder="Số phòng" onChange={(e) => {
            SetRoomFloor(prev => ({ ...prev, room: e.target.value }))
          }} />
        </div>
        <div>Số tầng:
          <Input value={roomFloor.floor} min={0} type="number" placeholder="Tầng" onChange={(e) => {
            SetRoomFloor(prev => ({ ...prev, floor: Number(e.target.value) }))
          }} />
        </div>
        <div>
          Trạng thái:
          <Dropdown menu={{ items: roomTypeItem }} placement="bottom" trigger={['click']}>
            <Button>{roomStatus}</Button>
          </Dropdown>
        </div>
      </div>
    </Modal>
    <Modal title="Sửa thông tin phòng" open={openEditModal} onOk={handleEditModalOk} onCancel={handleEditModalCancel}>
      <div>
        <div>Kiểu phòng:
          <Dropdown menu={{ items: roomType }} placement="bottom" trigger={['click']}>
            <Button >{typeSelected?.name || "Chọn loại phòng"}</Button>
          </Dropdown>
        </div>
        <div>trạng thái:
          <Input min={0} type="number" placeholder="Trạng thái" onChange={(e) => {
            if (e.target.value == "1") { setRoomStatus('Ready') } else { setRoomStatus('Booked') }
          }} />
        </div>
      </div>
    </Modal>
  </div>
}