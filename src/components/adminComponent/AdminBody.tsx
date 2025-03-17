import BodyLeftSide from "./BodyLeftSide";
import BodyRightSide from "./BodyRightSide";

export default function AdminBody() {
  return <>
    <div className="row">
      <div className="col-2 admin-body-leftSide" >
        <BodyLeftSide />
      </div>
      <div className="col-10 admin-body-rightSide" >
        <BodyRightSide />
      </div>
    </div>
  </>
}