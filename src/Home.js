import { app } from "./Firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icons from "./images/icons1.png";
// import "./DataTest.css";
import "./home.css";

import gmailIcon from "./images/gmailIcon.jpeg";
import UIDContext from "./Context";
const db = getDatabase(app);

var obj = {};

function Home() {
  const navigate = useNavigate();
  const referenceOfDatabase = ref(db, "studentBoarding/data");
  const [UIDS, setUIDS] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [studentData, setStudentData] = useState(null);
  useEffect(() => {
    onValue(referenceOfDatabase, (snapshot) => {
      const data = snapshot.val();
      setStudentData(data);

      const s = Object.keys(data || null);

      setUIDS(s);

      for (let uid in data) {
        if (data.hasOwnProperty(uid)) {
          console.log(`UID: ${uid}`);
          obj = {
            ...obj,
            [uid]: data[uid],
          };
          console.log("Student Info:", data[uid]);
        }
      }
      setUIDS(Object.keys(obj));
    });
  }, []);
  const { setStudentID } = useContext(UIDContext);

  const searchedUIDs = useMemo(() => {
    if (!searchText) return [];
    const matchingUIDs = UIDS.filter((uid) => uid.includes(searchText));
    console.log(matchingUIDs);
    if (matchingUIDs.length > 0) {
      return matchingUIDs;
    } else {
      return [];
    }
  }, [UIDS, searchText]);
  useEffect(() => {
    console.log(studentData);
  }, [studentData]);
  console.log(searchedUIDs);
  return (
    <div
      className="homeContainer1"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      // }}
    >
      <div className="homeHeader" style={{ background: "#29ab87" }}>
        <div
          id="header"
          className="homeNavigationBar"
          // className="homeNavbar"
        >
          <div className="homeNavigationBarLogo">
            <img alt="Logo"></img>
          </div>
          <div className="homeNavigationBarLinks">
            <p className="navbarLinks">Home</p>
            <p
              onClick={() => navigate("/")}
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
      <div className="homeContainerMainBlock">
        <div className="homeContainerMain">
          <input
            className="searchText"
            value={searchText}
            placeholder="Search"
            type="number"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <div className="UIDHolder2">
            <h3 className="studentHeading">Students</h3>
            {searchedUIDs.length > 0
              ? searchedUIDs.map((uid) => {
                  return (
                    <div key={uid}>
                      <Link
                        to={`/UIDProfilePage`}
                        onClick={() => {
                          setStudentID(uid);
                          localStorage.setItem("uid", uid);
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        {studentData ? (
                          <a href="none" className="UIDS1">
                            {studentData[uid].studentData?.firstName}
                            {studentData[uid].studentData?.lastName}
                          </a>
                        ) : null}
                      </Link>
                    </div>
                  );
                })
              : UIDS.map((uid) => {
                  return (
                    <div key={uid}>
                      <Link
                        to={`/UIDProfilePage`}
                        onClick={() => {
                          setStudentID(uid);
                          localStorage.setItem("uid", JSON.stringify(uid));
                        }}
                      >
                        {studentData ? (
                          <p className="UIDS1">
                            {studentData[uid].studentData?.firstName}
                            {studentData[uid].studentData?.lastName}
                          </p>
                        ) : null}
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <div className="footer1Block">
        <div className="footer1">
          <div className="iconHolder">
            <img
              className="footerimg1"
              src={gmailIcon}
              style={{ height: 40 }}
            ></img>
          </div>
          <div></div>
          <div style={{ alignSelf: "center" }}>
            <p>COPYRIGHT 2024</p>
            <img className="footerimg" src={icons} style={{}}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
