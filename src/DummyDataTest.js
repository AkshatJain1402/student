import { app } from "./Firebase";
import {
  get,
  getDatabase,
  query,
  onValue,
  ref,
  orderByChild,
  equalTo,
} from "firebase/database";
import React from "react";
import { useState, useEffect } from "react";
import { imageDb } from "./Firebase";
import { connectStorageEmulator, uploadBytes } from "firebase/storage";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const appVerifier = window.recaptchaVerifier;
const auth = getAuth(app);

const db = getDatabase(app);

function DummyDataTest() {
  const data = {};
  var obj = {};
  const [code, setCode] = useState();
  const [UIDs, setUIDs] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [imageURL, setImageUrl] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  var a = "";
  var b = "";

  const testing = async () => {
    let result = null;
    for (let uid of UIDs) {
      var path = ref(db, `studentBoarding/data/${uid}/parentNumber`);

      console.log("working");

      onValue(path, (snapshot) => {
        const num = snapshot.val();
        if (num == "8265873414") {
          console.log(uid);
        }
      });

      if (result) break; // If uid is found, exit the loop
    }
    return result; // Return the uid
  };

  const savingStudentInfo = () => {
    UIDs.map(async (uids) => {
      console.log(UIDs + "studentBoarding/data/" + uids + "/studentInfo");

      onValue(
        ref(db, "studentBoarding/data/" + uids + "/studentData"),
        (snapshot) => {
          a = snapshot.val();
          setStudentInfo(a);
          console.log("si" + a + studentInfo);
          console.log("uids" + uids);
        }
      );

      obj = {
        [uids]: a,
      };
      console.log(obj);
      Object.assign(data, obj);
      onValue(
        ref(db, "studentBoarding/data/" + uids + "/boardingTime"),
        (snapshot) => {
          b = snapshot.val();

          console.log("si" + b);
          console.log("uids" + uids);
        }
      );
      var c = {
        studentInfo1: a,
        boardingTime1: b,
      };
      obj = {
        [uids]: c,
      };
      Object.assign(data, obj);
      console.log(data + "all daata");
    });
  };
  // Fetching all UIDs of students in the database.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        onValue(ref(db, "studentBoarding/data"), (snapshot) => {
          setUIDs(Object.keys(snapshot.val()));
        });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    testing();
    // savingStudentInfo();

    // console.log(data);
    // localStorage.setItem("monitoringData", JSON.stringify(data));
  }, [UIDs]);

  const [image, setImage] = useState("");
  const uploadImage = () => {
    const imageRef = ref(imageDb, "studentImages/");
    uploadBytes(imageRef, image);
  };

  return (
    <div>
      <div id=""></div>
      dummyDataTest
      {data[0]}
      <input
        type="number"
        placeholder="enter number"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      ></input>
      <input
        placeholder="code"
        type="number"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></input>
      <button id="sign-in-button" onClick={() => {}}>
        signIn
      </button>
      {/* <div>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div> */}
    </div>
  );
}

export default DummyDataTest;
