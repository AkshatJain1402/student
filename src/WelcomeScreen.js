import React from "react";
import { Link } from "react-router-dom";
import LocationIcon from "./LocationIcon.jpeg";

function WelcomeScreen() {
  return (
    <div className="container-fluid">
      <div>
        <h1 className="display-4 text-center mt-5 pt-5">
          The Student Bus Boarding System
        </h1>
      </div>
      <div className="bg-light pt-3 container mt-5 row" style={{}}>
        <div>
          <h2 className="text-right font-weight-bold ">Features we Provide</h2>
        </div>
        <div className="mt-5 col-lg-6 order-lg-1">
          <p
            className="lead  pb-3"
            style={{
              fontSize: 30,
              fontFamily: "cursive",
              fontWeight: "lighter",
            }}
          >
            Real-Time Bus Location
          </p>
          <img
            style={{ height: 100, width: 125, borderRadius: 20 }}
            src={LocationIcon}
            className="image-fluid"
            alt="locationIcon"
          />
        </div>
        <div className="mt-5">
          <p
            className="lead  pb-3"
            style={{
              fontSize: 30,
              fontFamily: "cursive",
              fontWeight: "lighter",
            }}
          >
            Boarding Status of students
          </p>
          <img
            style={{ height: 200, width: 200 }}
            src="student\src\Location.jpeg"
            className=""
            alt="locationIcon"
          />
        </div>
      </div>

      <div className="mt-5" style={{ width: 640 }}>
        <Link
          to={"/"}
          className="btn pt-2 text-center "
          style={{
            backgroundColor: "#3897f2",
            width: 80,
            fontWeight: "bold",
          }}
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen;
