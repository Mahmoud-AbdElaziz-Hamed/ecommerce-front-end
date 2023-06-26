import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/SignUp";

import Categories from "./components/Categories/Categories";

function App() {
  const [modalIsShown,setModalIsShown ] = useState(false);

  const [loginModalStatus,setLoginModalStatus ] = useState(true);
  const [signUpModalStatus,setSignUpModalStatus ] = useState(false);

  //toggle the modal it self 
  function toggleModal(){
    setModalIsShown(prevValue => !prevValue)
  }
  
  //toggle between sign up and login forms
  function toggleModalContent(){
    setSignUpModalStatus(prevValue => !prevValue)
    setLoginModalStatus(prevValue => !prevValue)
  }
  

  return (
    <>
      <button onClick={toggleModal} >toggle</button>
      {modalIsShown && loginModalStatus && <Login  toggleModal={toggleModal} toggleModalContent={toggleModalContent} />  }
      {modalIsShown && signUpModalStatus && <Signup  toggleModal={toggleModal} toggleModalContent={toggleModalContent} />  }

      <Categories />
    </>
  );
}

export default App;
