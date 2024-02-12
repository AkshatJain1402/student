import React, { useContext, useEffect, useState } from "react";
import "./UIDProfilePage.css";
import gmailIcon from "./images/gmailIcon.jpeg";
import { useNavigate } from "react-router-dom";
import UIDContext from "./Context";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "./Firebase";
import { Link } from "react-router-dom";
import MIET from "./MIET.png";
import { ref as Ref, getStorage, getDownloadURL } from "firebase/storage";
const db = getDatabase(app);
const storage = getStorage(app);

function UIDProfilePage() {
  const navigate = useNavigate();
  const [studentFirstName, setStudentFirstName] = useState(null);
  const [studentLastName, setStudentLastName] = useState(null);
  const [studentRollNumber, setStudentRollNumber] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const [studentContactNumber, setStudentContactNumber] = useState(null);
  const [boardingTime, setBoardingTime] = useState([]);

  const studentID = JSON.parse(localStorage.getItem("uid"));
  const fetchImage = async () => {
    const storageRef = Ref(storage, "/studentImages/4975704860782000681520004");

    const url = await getDownloadURL(storageRef);
    setImageURL(url);
  };
  useEffect(() => {
    console.log("hora");
    try {
      onValue(
        ref(db, "studentBoarding/data/" + studentID + "/studentData"),
        (snapshot) => {
          console.log(snapshot.val());

          setStudentFirstName(snapshot.val().firstName);
          setStudentContactNumber(snapshot.val().contactNumber);
          setStudentLastName(snapshot.val().lastName);
          setStudentRollNumber(snapshot.val().studentRollNumber);
        }
      );
    } catch {
      alert("Error in fetching data");
    }

    try {
      onValue(
        ref(db, "studentBoarding/data/" + studentID + "/boardingTime"),
        (snapshot) => {
          console.log(snapshot.val());
          setBoardingTime(Object.values(snapshot.val()));
        }
      );
    } catch {
      //add toast message here
      alert("error in fetching Data");
    }
    fetchImage();
  }, []);

  console.log(studentID);
  return (
    <div>
      <div className="homeHeader" style={{ background: "#29ab87" }}>
        <div
          id="header"
          className="homeNavigationBar"
          // className="homeNavbar"
        >
          <div className="homeNavigationBarLinks">
            <p className="navbarLinks" onClick={() => navigate("/")}>
              Home
            </p>
            <p
              className="navbarLinks"
              // style={{ marginLeft: 850, alignItems: "flex-end" }}
            >
              Contact US
            </p>

            <p
              className="navbarLinks"
              // style={{ marginLeft: 40, alignItems: "flex-end" }}
            >
              About US
            </p>
          </div>
        </div>
      </div>
      <div className="mainContainter">
        <div className="boardingInfoContainer">
          <h1 className="studentHeading">Boarding Info</h1>

          <table style={{ marginTop: 20 }}>
            <tr className="boardingTime">
              <th>boarded today</th>
              {<td>{boardingTime[boardingTime.length - 1]}</td>}
            </tr>
          </table>

          <div>
            <p>Last Tagged Location of {studentFirstName}</p>
            <img
              style={{ marginTop: 50, height: 300, width: 400 }}
              src={MIET}
              alt="location"
            ></img>
          </div>
        </div>
        <div className="studentProfileContainer">
          <div className="profileImage">
            <img src={imageURL} alt="image" className="studentImage" />
          </div>
          <div style={{ alignSelf: "center" }}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "large",

                fontFamily: "sans-serif",
              }}
            >
              Name : {studentFirstName} {studentLastName}
            </p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "large",

                fontFamily: "sans-serif",
              }}
            >
              Roll No : {studentRollNumber}
            </p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "large",

                fontFamily: "sans-serif",
              }}
            >
              Phone : {studentContactNumber}
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="iconHolder">
          <img src={gmailIcon} style={{ height: 40 }}></img>
        </div>
        <div style={{ alignSelf: "center" }}>
          <p>COPYRIGHT 2024</p>
        </div>
      </div>
    </div>
  );
}

export default UIDProfilePage;
