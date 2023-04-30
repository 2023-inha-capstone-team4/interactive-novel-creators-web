import { RiQuillPenFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <span className="logo" style={{ fontSize: 20, fontWeight: 900 }}>
        <RiQuillPenFill color="#ff6868" />
        Editor
      </span>
    </Link>
  );
}
