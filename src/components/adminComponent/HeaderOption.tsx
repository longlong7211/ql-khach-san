import { Dispatch, SetStateAction, useState } from "react";
import { IoMenu } from "react-icons/io5";

type TOptionItem = { key: number, value: string }
type TListOptionData = {
  listOption: TOptionItem[];
  selected?: Dispatch<SetStateAction<number>>;
}
export default function HeaderOption({ listOption, selected }: TListOptionData) {
  const [selectedOption, setSelectedOption] = useState<{ key: number, value: string }>(listOption[0]);
  return <>
    <div className="d-flex align-items-center">
      <IoMenu size={30} color="#fff" className="me-3 ms-5" />
      {listOption.map((item: TOptionItem) => {
        return <>
          <div className={`header-option-item ${selectedOption.key === item.key ? 'header-option-selected' : ''}`} onClick={() => {
            setSelectedOption(item);
            selected && selected(item.key)
          }}>
            {item.value}
          </div>
        </>
      })}
    </div>
  </>
}