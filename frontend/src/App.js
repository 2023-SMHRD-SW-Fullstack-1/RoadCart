import { Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/login/kakao/Profile';
import AuthKakao from './components/login/kakao/AuthKakao';
import AuthNaver from './components/login/naver/AuthNaver';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Main from './components/Main';
import MyPage from './components/MyPage';
import ModifyPage from './components/ModifyPage';
import { useState } from 'react';
import LogOutPage from './components/LogOutPage';
import Google_Nick from './components/login/google/Google_Nick';
import Kakao_Nick from './components/login/kakao/Kakao_Nick';
import JoinPage from './components/JoinPage';



function App() {
  // 로그인 여부 확인 
  const [isLoggendIn, setIsLoggendIn] = useState(false)

  return (
    <div className='container'>
      <Header isLoggendIn={isLoggendIn} />
      <Routes>
        // Header
        // Main
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<LoginPage isLoggendIn={isLoggendIn} setIsLoggendIn={setIsLoggendIn} />} />
        <Route path='/logout' element={<LogOutPage setIsLoggendIn={setIsLoggendIn} />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/myprofile' element={<ModifyPage />} />
        <Route path='/authkakao' element={<AuthKakao isLoggendIn={isLoggendIn} setIsLoggendIn={setIsLoggendIn} />} />
        <Route path='/authnaver' element={<AuthNaver isLoggendIn={isLoggendIn} setIsLoggendIn={setIsLoggendIn} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/googlenick' element={<Google_Nick setIsLoggendIn={setIsLoggendIn} />} />
        <Route path='/kakaonick' element={<Kakao_Nick setIsLoggendIn={setIsLoggendIn} />} />
        <Route path='/join' element={<JoinPage setIsLoggendIn={setIsLoggendIn} isLoggendIn={isLoggendIn} />} />
        {/* <Route path='/slide' element={<SimpleSlider/>}/> */}

      </Routes>
    </div>
  );
}

export default App;
