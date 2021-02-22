import React, {useState,useEffect} from 'react';
import AppRouter from "./Router";
import {authService} from "../fblnstance";

function App() {
  const [init, setInit] = useState(false);//firebase가 프로그램을 초기화해주기
  const [isLoggedIn, setIsLoggedIn] = useState(false);//유저의 로그인 여부 확인
  const [userObj, setUserObj]=useState(null);
  
  useEffect(()=>{
      authService.onAuthStateChanged((user)=>{
        if(user){
          setIsLoggedIn(true);
          setUserObj(user); //로그인한 유저 저장
        }else{
          setIsLoggedIn(false);
          setUserObj(null);
        }
        setInit(true);
      });
  },[])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter </footer> */}
    </>
  );
}

export default App;

//firebase의 초기화를 기다리기 위해 init을 state로 써줌
//useEffect에서 authStateChanged 메소드 덕분에
//user가 true일때 로그인,init변수를 true로 변경해서
//Home으로 이동함으로써 로그인이 됐음을 알려주는거래