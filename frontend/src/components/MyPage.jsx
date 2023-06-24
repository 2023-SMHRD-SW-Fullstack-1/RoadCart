import React, { useEffect } from 'react'
import ProfileLogo from './img/profile_icon.png'


import './style/MyPageStyle.css'
import { Link, useNavigate } from 'react-router-dom'

const MyPage = ({isLoggendIn}) => {
    const nav = useNavigate()

    useEffect(()=>{
            if(isLoggendIn==false) {
                alert('접근불가') 
                nav('/') } 

        },[])
    const sessionStorage = window.sessionStorage
    const user_nick = sessionStorage.getItem('user_nick')

    return (
        <div className='MypageContainer'>
            <img id='profile' src={[ProfileLogo]} width='250px'/>
            <h1 id='nickname'>{user_nick}</h1>
            <div>
            <button className="MyPageBtn" role="button">나의 일정</button>
            <button className="MyPageBtn" role="button">내 글 보기</button>
            <Link to='/myprofile' style={{textDecoration:'none'}}><button className="MyPageBtn">회원정보수정</button></Link>
            </div>
        </div>
    )
}

export default MyPage