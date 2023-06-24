import React, { useState } from 'react'
import { useEffect } from 'react';
import qs from "qs";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// 동의하고 계속하기를 누르면 이동되어 보여지는 화면이 REDIRECT_URI 화면 -> AuthKakao.js
const AuthKakao = ({ isLoggendIn, setIsLoggendIn }) => {

    let sessionStorage = window.sessionStorage;

    const nav = useNavigate();

    // 발급된 인가코드를 백엔드로 넘겨주기 위해 꺼내오는 작업이 필요.
    // code라는 이름으로 파라미터 코드 값을 꺼내오려면 아래와 같이 선언
    const code = new URL(window.location.href).searchParams.get("code");

    const getToken = async () => {
        // qs : 쿼리스트링을 파싱하거나, 스트링화하는 간편한 라이브러리
        const payload = qs.stringify({
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
            redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
            code: code,
            client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
        })

        try {
            // access token 가져오기
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                payload

            );

            // Kakao Javascript SDK 초기화
            window.Kakao.init(process.env.REACT_APP_KAKAO_REST_API_KEY);

            // access token 설정
            window.Kakao.Auth.setAccessToken(res.data.access_token);

            let data = await window.Kakao.API.request({
                url: "/v2/user/me",
            })

            const requestData = {
                user_sns: 'kakao',
                user_token: data.id,
            }
            const config = {
                headers: { 'Content-Type': 'application/json;charset=UTF-8' }
            }
            axios.post(`http://172.30.1.39:8089/road/snslogin`, requestData, config)
                .then((res) => {
                    if (!res.data.loginUser) {
                        sessionStorage.setItem('user_token', data.id)
                        nav('/kakaonick')
                    } else {
                        // 세션 저장

                        sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)// 백엔드에서 받아와야 함
                        sessionStorage.setItem('user_sns', res.data.loginUser.user_sns)
                        sessionStorage.setItem('user_id', res.data.loginUser.user_id)

                        // 로그인 여부 확인 true
                        setIsLoggendIn(true)
                        alert('로그인성공')
                        nav('/')

                    }
                })

        } catch (err) {
            console.log('error:', err);
        }
    }
    useEffect(() => {
        getToken();
    }, []);

    return null;
}

export default AuthKakao