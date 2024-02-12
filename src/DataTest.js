import { app } from "./Firebase";
import { get, getDatabase, onValue, ref } from "firebase/database";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DataTest.css";
import Home from "./Home";
import gmailIcon from "./images/gmailIcon.jpeg";
import UIDContext from "./Context";
const db = getDatabase(app);
var Data1 = "";
var obj = {};

function DataTest() {
  const referenceOfDatabase = ref(db, "studentBoarding/data");
  const [UIDS, setUIDS] = useState([]);
  const [searchText, setSearchText] = useState(null);
  useEffect(() => {
    onValue(referenceOfDatabase, (snapshot) => {
      const data = snapshot.val();

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
  var searchedUIDs = [];
  if (searchText) {
    searchedUIDs = UIDS.filter((uid) => {
      return uid.includes(searchText);
    });

    console.log(searchedUIDs);
  }
  return (
    <div>
      <div className="navbar">
        <img></img>

        <Link className="navbarText" to={Home}>
          {" "}
          Home
        </Link>
      </div>
      <div className="container">
        <input
          className="searchText"
          value={searchText}
          placeholder="Search"
          type="number"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div className="UIDHolder">
          {}
          {searchedUIDs
            ? searchedUIDs.map((uid) => {
                return (
                  <div key={uid}>
                    <Link
                      to={"/UIDProfilePage"}
                      onClick={() => {
                        setStudentID(uid);
                        localStorage.setItem("uid", uid);
                      }}
                    >
                      {uid}
                    </Link>
                  </div>
                );
              })
            : null}
          {UIDS.map((uid) => {
            return (
              <div key={uid}>
                <Link
                  to={`/UIDProfilePage`}
                  onClick={() => {
                    setStudentID(uid);
                  }}
                  className="UIDS"
                >
                  {uid}
                </Link>
              </div>
            );
          })}
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

export default DataTest;
