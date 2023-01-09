import React, { useRef } from 'react';

import './App.css';
import Chatting from './Chatting_app/chatting';
import firebaseconfig from "./Chatting_app/firebaseconfig"
import { getDatabase } from 'firebase/database';
import { auth } from './Chatting_app/firebaseconfig';
function App() {
   console.log(auth.currentUser);
   
  return (
    <Chatting />
  );
}

export default App;
