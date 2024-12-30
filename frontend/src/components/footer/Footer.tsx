import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        minHeight: "15vh",
        maxHeight: "30vh",
        marginTop: 50,
        boxSizing: "border-box",
      }}
    >
      <p style={{ fontSize: "30px", textAlign: "center" }}>
        Built with love by &nbsp;
        <span>
          <Link style={{ color: "white" }} to={"https://mafaqarif.com/"}>
            Afaq Arif.
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Footer;
