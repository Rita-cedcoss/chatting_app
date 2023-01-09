import React, { useEffect, useRef, useState } from "react";
import firebaseApp from "./firebaseconfig";
import { getDatabase, onValue, push, ref } from "firebase/database";
import {auth} from "./firebaseconfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type User={
  id:string
  uid:string,
  photoURL:string,
  arrChat:string,
  userPic:string
}

const Chatting = () => {
  let db = getDatabase(firebaseApp);
  const inpRef=useRef<HTMLInputElement>(null);
  console.log(db);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; 
const [chatArr,setChatArr]=useState<User[]>([]);
 
  let date = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getHours()}:${new Date().getMinutes()}`;
// const [userData,setUser]=useState<User>({});
// console.log(userData)
  const sendMsg=()=>{
    let text
    if(inpRef.current!==null){
      text=inpRef.current.value;
      let date = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getHours()}:${new Date().getMinutes()}`;
      push(ref(db, "/messages"), {
        uid:"Rita Pal",
        userPic: "abc",
        txt: inpRef.current.value,
        createdAt: date.toString(),
      });
    }
    console.log(text);  
  }
  // Sign with google
  const SignWithGoogle=()=>{
    const provider=new GoogleAuthProvider();
    signInWithPopup(auth,provider);
  }
  // display data
  // useEffect
  useEffect(() => {
    const chatRef = ref(db, "/messages");
    onValue(chatRef, (snapshot) => {
      const chatValue = snapshot.val();
      const arrChat = [];
      for (let id in chatValue) {
        arrChat.push({ id, ...chatValue[id] });
      }
      console.log(arrChat);
      setChatArr(arrChat);
    });
  }, [db]);
  return (
    <>
      <section style={{ backgroundColor: "#eee", position: "relative" }}>
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card ">
                {/* Top section */}
                <div
                  className="card-header  d-flex justify-content-between align-items-center p-3"
                  style={{ borderTop: "4px solid #ffa900" }}
                >
                  <h5 className="mb-0">Chat messages</h5>
                  <div className="d-flex flex-row align-items-center">
                    <span className="badge bg-warning me-2 p-2" onClick={SignWithGoogle}>Sign In</span>
                    <span className="badge bg-warning me-2 p-2">Log Out</span>
                    <i className="fas fa-minus me-3 text-muted fa-xs"></i>
                    <i className="fas fa-comments me-3 text-muted fa-xs"></i>
                    <i className="fas fa-times text-muted fa-xs"></i>
                  </div>
                </div>
                {/*Chat section  */}
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: "relative", "minHeight": "500px" }}
                >
                  <div className="d-flex justify-content-between">
                    <p className="small mb-1">Timona Siera</p>
                    <p className="small mb-1 text-muted">23 Jan 2:00 pm</p>
                  </div>
                  <div className="d-flex flex-row justify-content-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-3 rounded-3"
                        style={{ "backgroundColor": "#f5f6f7" }}
                      >
                        For what reason would it be advisable for me to think
                        about business content?
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="small mb-1 text-muted">23 Jan 2:05 pm</p>
                    <p className="small mb-1">Johny Bullock</p>
                  </div>
                  <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                      <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                        Thank you for your believe in our supports
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div>  
                </div>
                {/* footer section */}
                <div className="footer position-fixed bottom-0 ">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      ref={inpRef}
                      className="form-control"
                      placeholder="Type message"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      className="btn btn-warning"
                      onClick={sendMsg}
                      type="button"
                      id="button-addon2"
                      style={{ "paddingTop": ".55rem" }}
                    >
                      Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chatting;
