import React, { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import GoogleLogo from './google_icon.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AuthGoogle = ({ isLoggendIn, setIsLoggendIn }) => {

    const [user_id, setUser_id] = useState('')
    const [user_pw, setUser_pw] = useState('')
    const [user_nick, setUser_nick] = useState('')



    const nav = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            // console.log('tokenResponse :', tokenResponse);
            // 사용자 정보 가져오기(fetching userinfo can be done on the client or the server)
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                        "Content-Type": 'application/json;charset=UTF-8'
                    },
                })
                .then(res => res.data);

            const requestData = {
                user_id: userInfo.email,
                user_token: userInfo.sub,
                user_sns:'google',
            }

            const config = {
                headers: { 'Content-Type': 'application/json;charset=UTF-8' }
            }

            axios.post(`http://172.30.1.39:8089/road/snslogin`, requestData, config)
                .then((res) => {
                    if (!res.data.loginUser) {
                        sessionStorage.setItem('user_token', userInfo.sub)
                        nav('/googlenick')
                    } else {
                        // 세션 저장
                        sessionStorage.setItem('user_id', res.data.loginUser.user_id)
                        sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)
                        sessionStorage.setItem('user_sns', res.data.loginUser.user_sns)
                        // 로그인 여부 확인 true
                        setIsLoggendIn(true)
                        alert('로그인성공')
                        nav('/')
                    }
                })
        }

    })


    useEffect(() => {
        login()
    }, [])
    return (
        <>
            <div>
                {/* 구글 로그인 버튼 */}
                <img src={GoogleLogo} onClick={() => login()} width='50px'></img>
            </div >
        </>
    )
}

export default AuthGoogle