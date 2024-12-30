import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: String;
  textcolor: string;
  onClick?: () => Promise<void>;
};

const NavLink = (props: Props) => {
  return (
    <Link
      className="nav-link"
      to={props.to}
      style={{ background: props.bg, color: props.textcolor }}
      onClick={props.onClick}
    >
      {props.text}
    </Link>
  );
};

export default NavLink;
