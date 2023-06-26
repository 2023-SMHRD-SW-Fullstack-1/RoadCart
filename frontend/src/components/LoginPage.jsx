import React, { useEffect, useState } from 'react'
import kakaoLogo from './login/kakao/kakao_icon.png'
import naverLogo from './login/naver/naver_icon.png'
import AuthGoogle from './login/google/AuthGoogle';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ isLoggendIn, setIsLoggendIn }) => {


    /* 카카오  */
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
    const REDIRECT_URI_K = process.env.REACT_APP_KAKAO_REDIRECT_URI
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI_K}&response_type=code`
    const LoginBtnk = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    // 네이버 
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID // 발급받은 클라이언트 아이디
    const REDIRECT_URI_N = process.env.REACT_APP_NAVER_REDIRECT_URI_  // Callback URL
    const STATE = "false"
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI_N}`

    const LoginBtnN = () => {
        window.location.href = NAVER_AUTH_URL;
    }

    // 기본 로그인
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [userNick, setUserNick] = useState('')
    const [userSns, setUserSns] = useState('')

    const nav = useNavigate()

    const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }

    // 로그인 버튼을 눌렀을 떄
    const LoginBtn = () => {
        const requestData = {
            user_id: inputId,
            user_pw: inputPw,
        };
        axios.post(`spring/road/login`, requestData, config)
            .then((res) => {

                try{
                // id와 pw가 로그인정보와 일치하다면
                if (res.data.loginUser.user_id == inputId && res.data.loginUser.user_pw == inputPw) {
                    setUserNick(res.data.loginUser.user_nick)
                    // 세션에 id, nick, sns 정보 저장
                    sessionStorage.setItem('user_id', inputId)
                    sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)
                    sessionStorage.setItem('user_sns', res.data.loginUser.user_sns)
                    sessionStorage.setItem('user_token',res.data.loginUser.user_token)
                    // 로그인 여부 : true 
                    setIsLoggendIn(true)
                    alert('로그인성공')
                    nav('/')
                } else {
                    alert('로그인정보가 일치하지 않습니다.')
                }}catch{
                    alert('로그인정보가 일치하지 않음')
                }
            })
    }

    // 입력한 키가 Enter일 경우 가입하기 버튼 클릭한 것과 동일한 동작 실행
    const activeEnter = (e) => {
        if (e.key == 'Enter') {
            LoginBtn()   // Enter 입력이 되면 클릭 이벤트 실행
        }
    }


    return (
        <div className='LoginPageContainer'>
            <div id='LoginPageTxt'>
                <h1 id='LoginPageTitle'>LOG IN</h1>
                <p className='LoginPageSubTitle' id='travelPlannertxt'>나만의 여행일정 플래너 - 길바구니</p>
            </div>
            <div className="LoginPageInputBox">
                <input className="input" onChange={(e) => setInputId(e.target.value)} name='id' type="text" placeholder="아이디" />
                <span className="border"></span>
            </div>
            <div className="LoginPageInputBox">
                <input onKeyDown={activeEnter} className="input" name='pw' onChange={(e) => setInputPw(e.target.value)} type="password" placeholder="비밀번호" />
                <span className="border"></span>
            </div>
            <br /><br />
            <button onClick={LoginBtn} className="loginBtn" role="button">로그인</button>

            <p className='LoginPageSubTitle'>회원이 아니세요? {' '}
                <Link to='/join' style={{ textDecoration: 'none' }}><span id='joinBtn'>회원가입하기</span></Link></p>


            <p className="or-divider">or</p>
            <p>SNS 간편 로그인</p>

            {/* <div class="button-basic-wrapper color-type" onClick={LoginBtnk}>
                <div class="button-icon-wrap">
                    <span class="buttoniconimage"></span>
                </div>
                <div class="button-contents button-small-type">
                    <span class="button-text">카카오로 로그인</span>
                </div>
            </div> */}

            {/* 소셜 로그인 버튼 */}
            {/* 카카오 로그인 버튼 */}
            <div id='logo_container'>
                <div className='btn-container'>
                    <img onClick={LoginBtnk} src={kakaoLogo} width='50px' /></div>

                {/* 구글 로그인 버튼 */}
                <GoogleOAuthProvider clientId={'212077333063-9np78oe3ced4ndc5svcrfc1rmh3o296a.apps.googleusercontent.com'}>
                    {/* onScriptLoadError={() => console.log("실패")}
                    onScriptLoadSuccess={() => console.log("성공")} */}
                    <div className='btn-container'><AuthGoogle isLoggendIn={isLoggendIn} setIsLoggendIn={setIsLoggendIn} width="50" /></div>
                </GoogleOAuthProvider>


                {/* 네이버 로그인 */}
                <div className='btn-container'>
                    <img onClick={LoginBtnN} src={naverLogo} width="50" /></div>
            </div>
        </div>




    )
}

export default LoginPage