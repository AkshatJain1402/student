import React from "react";
import { useState, useEffect } from "react";

function Navbar() {
  return (
    <div
      style={{
        height: 80,
        backgroundColor: "blue",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        padding: "10px", // Adding padding for better visibility
      }}
    >
      <div style={{ marginRight: 50 }}>
        <p
          style={{
            fontSize: 28,
            fontWeight: "bolder",
            fontFamily: "cursive",
          }}
        >
          Student Bus Boarding
        </p>
      </div>
      <div style={{}}>
        <p></p>
      </div>
    </div>
  );
}

export default Navbar;
