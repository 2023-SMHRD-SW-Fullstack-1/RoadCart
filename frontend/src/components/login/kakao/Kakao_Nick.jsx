import React, { useState } from 'react'
import { useEffect } from 'react';
import qs from "qs";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ProfileLogo from '../../img/profile_icon.png'
import '../../../App.css'

const Kakao_Nick = ({ isLoggendIn, setIsLoggendIn }) => {

    const nav = useNavigate();
    const [inputNick, setInputNick] = useState('');
    const [text, setText] = useState('');
    const [data, setData] = useState([]);

    // 세션 값 가져오기 (id, token)
    const userId = sessionStorage.getItem('user_id')
    const userToken = sessionStorage.getItem('user_token')

    const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }

    const chKVal = (e) => {
        setInputNick(e.target.value)
    }


    // 닉네임 중복 확인
    const CkBtn = () => {
        console.log(data);
        const requestData = { user_nick: inputNick }
        console.log('버튼 클릭했을 때:', inputNick);
        axios.post(`/spring/road/nickcheck`, requestData, config)
            .then((res) => {
                console.log(res.data);
                if (res.data == true) {
                    setText('사용 가능한 닉네임이다')
                } else {
                    setText('이미 존재하는 닉네임이다')
                }
            }
            )
    }

    // 회원가입 버튼
    const startBtn = () => {
        // 백엔드에게 보낼 데이터
        const requestData = {
            user_id: userId,
            user_token: userToken,
            user_nick: inputNick,
            user_sns: 'kakao',
        }

        let sessionStorage = window.sessionStorage;
        // headers
        const config = {
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        }
        console.log(requestData);
        axios.post(`/spring/road/snsjoin`, requestData, config)
            .then((res) => {
                console.log(res.data.loginUser.user_pw);
                // 세션 저장
                sessionStorage.setItem('user_id', res.data.loginUser.user_id)
                sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)
                sessionStorage.setItem('user_sns', res.data.loginUser.user_sns)
                // 로그인 여부 확인 true

                setIsLoggendIn(true)
                console.log(isLoggendIn);
                alert('회원가입 성공')
                nav('/')
            })
    }


    return (
        <div className='LoginPageContainer'>
            <div>
                <img id='profile' src={[ProfileLogo]} width='250px' />

                <div id='LoginPageTxt'>
                    <h1 id='LoginPageTitle'>회원가입</h1>
                    <p className='LoginPageSubTitle' id='travelPlannertxt'>나만의 여행일정 플래너 - 길바구니</p>
                </div>
            </div>
            <div className="LoginPageInputBox" style={{ display: 'flex' }}>
                <input className="input" id="name" onChange={chKVal} type="text" placeholder="사용할 닉네임을 입력해주세요."
                    style={{
                        border: 'none',
                    }} />
                <button className="loginBtn" onClick={CkBtn} style={{
                    width: '100px', height: '30px', borderRadius: '50px', backgroundColor: 'white', color: 'black', border: '1px solid',
                    marginTop: '25px', fontSize: '12px'
                }}>중복확인</button>
                <span className="border" ></span>
            </div>
            <br /><div>{text}</div><br />

            <button className="loginBtn" role="button" onClick={startBtn}>길바구니 시작하기</button>
        </div>
    )
}

export default Kakao_Nick