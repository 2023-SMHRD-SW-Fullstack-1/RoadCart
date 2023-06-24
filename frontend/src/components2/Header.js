import React from 'react'
import { Link } from 'react-router-dom'
import mainLogo from '../img/mainLogo.png'
import myPageLogo from '../img/myPageLogo.png'
import '../style/MyPage.css'

const Header = () => {

    return (
        <div className='header-container'>
            <div className='link-container'>
                {/* <Link to='/'><h2>길바구니</h2></Link> */}
                <Link to='/'><img src={mainLogo} width='120'/></Link>
                
            </div>
            <div className='link-container'>
                {/* <Link to='/'>Main</Link>{" "} */}
                <Link to='' className='header-text'>일정 만들기</Link>
            </div>
            <div className='link-container'>
                <Link to='/post' className='header-text'>길스타그램</Link>
            </div>
            <div className='link-container'>
                <Link to='/login' className='header-text'>로그인</Link>
            </div>
            <div className='link-container' id='myPageBtn'>
                <Link to='/mypost'><img src={myPageLogo} width='13'/> 마이페이지</Link>
            </div>
        </div>
    )
}

export default Header