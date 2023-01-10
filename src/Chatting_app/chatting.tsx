import React, { useEffect, useRef, useState } from "react";
import firebaseApp from "./firebaseconfig";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { auth } from "./firebaseconfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Header from "./Header";
import Footer from "./Footer";
type User = {
  id: string;
  uid: string;
  photoURL: string;
  arrChat: string;
  userPic: string;
  createdAt: string;
  txt: string;
};
const Chatting = () => {
  let db = getDatabase(firebaseApp);
  const inpRef = useRef<HTMLInputElement>(null);
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
  const [chatArr, setChatArr] = useState<User[]>([]);
  let scrollRef = useRef<HTMLDivElement>(null);
  const [userData, setUser] = useState(auth.currentUser as any);
  const sendMsg = () => {
    let text;
    if (inpRef.current !== null) {
      text = inpRef.current.value;
      let date = `${new Date().getDate()} ${
        months[new Date().getMonth()]
      } ${new Date().getHours()}:${new Date().getMinutes()}`;
      push(ref(db, "/messages"), {
        uid: userData.uid,
        userPic: userData.photoURL,
        txt: inpRef.current.value,
        createdAt: date.toString(),
      });
    }
    console.log(text);
  };
  // Sign with google
  const SignWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => setUser(result.user));
  };
  // logout with google
  const LogoutWithGoogle = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };
  // display data
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
  // for scroll bar
  useEffect(() => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatArr]);
  if (userData !== null) {
    return (
      <>
        <section style={{ backgroundColor: "#eee", position: "relative" }}>
          <div className="container py-5 ">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-4">
                <div className="card ">
                  {/* Top section */}
                  <Header LogoutWithGoogle={LogoutWithGoogle} />
                  {/*Chat section  */}
                  <div
                    ref={scrollRef}
                    className="card-body overflow-auto"
                    style={{ position: "relative", maxHeight: "480px" }}
                  >
                    {chatArr.map((item) => {
                      console.log(userData, userData !== null);
                      if (item.uid === userData.uid) {
                        return (
                          <>
                            <div className="d-flex justify-content-between mt-3">
                              <p className="small mb-1 text-muted">
                                {item.createdAt}
                              </p>
                              <p className="small mb-1"></p>
                            </div>
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                              <div>
                                <p className="small p-2 me-3 mb-3 text-white rounded-3 bgColor">
                                  {item.txt}
                                </p>
                              </div>
                              <img
                                src={item.userPic}
                                alt="avatar 1"
                                className="rounded-circle"
                                style={{ width: "45px", height: "100%" }}
                              />
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <div className="d-flex justify-content-between">
                              <p className="small mb-1"></p>
                              <p className="small mb-1 text-muted">
                                {item.createdAt}
                              </p>
                            </div>
                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src={item.userPic}
                                className="rounded-circle"
                                alt="avtar"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-3 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  {item.txt}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              {/* footer section */}
              <Footer ref={inpRef} sendMg={sendMsg} />
            </div>
          </div>
        </section>
      </>
    );
  } else {
    // signup page
    return (
      <div className="col-6 m-auto d-flex justify-content-center p-5">
        <button className="btn btn-warning " onClick={SignWithGoogle}>
          Sign With Google
        </button>
      </div>
    );
  }
};

export default Chatting;
