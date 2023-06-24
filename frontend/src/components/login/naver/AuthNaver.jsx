import React, { useState } from 'react'
import { useEffect } from 'react';
import qs from "qs";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AuthNaver = ({ isLoggendIn, setIsLoggendIn }) => {


    let sessionStorage = window.sessionStorage;

    const nav = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    const getToken = async () => {
        // qs : 쿼리스트링을 파싱하거나, 스트링화하는 간편한 라이브러리
        const payload = qs.stringify({
            grant_type: "authorization_code",
            clientId: '_Pvdw2aBD9_ak2DcJnP6',
            callbackUrl: 'http://localhost:3000/authnaver',
            client_secret: '1p5ZSHkLdO',
            code: code,
            state: 'state',
        })

        console.log('log');

        const naverLogin = new window.naver.LoginWithNaverId({
            grant_type: "authorization_code",
            clientId: '_Pvdw2aBD9_ak2DcJnP6',
            callbackUrl: 'http://localhost:3000/authnaver',
            client_secret: '1p5ZSHkLdO',
            code: code,
            state: 'state',
            isPopup:false,
            loginButton:{color:'green', type:3, height:60}
        });
        
        
        console.log(naverLogin);
        naverLogin.init();

        try {
            // access token 가져오기
            await axios.post(
                "https://nid.naver.com/oauth2.0/token",
                naverLogin
            ).then((res) => {
                console.log(res.data);
                const access_token = getToken.data.access_token;
                const getUserInfo = axios.get({
                    url: 'https://openapi.naver.com/v1/nid/me',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                const userEamil = getUserInfo.data.response.email
                console.log(userEamil);
            })

            window.naver.LoginWithNaverId.prototype.init(process.env.REACT_APP_KAKAO_REST_API_KEY);

            // window.naver.Auth.setAccessToken(res.data.access_token);
            // console.log(res.data.access_token);

            // let data = await window.naver.API.request({
            //     url: "/v2/user/me",
            // })

            // const requestData = {
            //     user_sns: 'kakao',
            //     user_token: data.id,
            // }
            // const config = {
            //     headers: { 'Content-Type': 'application/json;charset=UTF-8' }
            // }

            // axios.post(`http://172.30.1.39:8089/road/snslogin`, requestData, config)
            //     .then((res) => {
            //         if (!res.data.loginUser) {
            //             sessionStorage.setItem('user_token', data.id)
            //             nav('/kakaonick')
            //         } else {
            //             // 세션 저장

            //             sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)// 백엔드에서 받아와야 함
            //             sessionStorage.setItem('user_sns', res.data.loginUser.user_sns)
            //             sessionStorage.setItem('user_id', res.data.loginUser.user_id)

            //             // 로그인 여부 확인 true
            //             setIsLoggendIn(true)
            //             alert('로그인성공')
            //             nav('/')

            //         }
            // })

        } catch (err) {
            console.log('error:', err);
        }



    }
    useEffect(() => {
        getToken()
    }, [])



    return null;
}

export default AuthNaver