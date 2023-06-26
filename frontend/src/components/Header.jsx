import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mainLogo from './img/roadLogo.png'
import myPageLogo from './img/mypage_logo.png'

const Header = ({isLoggendIn}) => {
    
    const [menu, setMenu] = useState('')
    const [menu2, setMenu2] = useState('')
    const [linkTo, setLinkTo] = useState('')
    
    useEffect(()=>{
        if(isLoggendIn){
            setMenu('로그아웃')
            setLinkTo('/mypage')
            setMenu2('마이페이지')
        }else{
            setMenu('')
            setLinkTo('/login')
            setMenu2('로그인')
        }
    },[isLoggendIn])

    return (
        <div className='header-container'>
            <div className='link-container'>
                <Link to='/'><img src={mainLogo} width='120'/></Link>
            </div>
            <div className='link-container'>
                {/* <Link to='/'>Main</Link>{" "} */}
                <Link to='/planner' className='header-text'>일정 만들기</Link>
            </div>
            <div className='link-container'>
                <Link to='/post' className='header-text'>길스타그램</Link>
            </div>
            <div className='link-container'>
            <Link to='/logout' className='header-text'>{menu}</Link>
            </div>
            <div className='link-container' id='myPageBtn'>
                <Link to={linkTo}><img src={myPageLogo} id='myPageLogo' width='13'/>{menu2}</Link>
            </div>
        </div>
    )
}

export default Header