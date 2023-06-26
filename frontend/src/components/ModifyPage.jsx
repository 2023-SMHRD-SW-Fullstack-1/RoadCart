import React, { useEffect, useState } from 'react'
import ProfileLogo from './img/profile_icon.png'
import './style/MyPageStyle.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const ModifyPage = ({ isLoggendIn, setIsLoggendIn }) => {

    const nav = useNavigate();

    useEffect(() => {
        if (isLoggendIn == false) {
            alert('접근불가')
            nav('/')
        }
    }, [])



    const sessionStorage = window.sessionStorage
    let user_id = sessionStorage.getItem('user_id')
    let user_nick = sessionStorage.getItem('user_nick')
    let user_pw = sessionStorage.getItem('user_pw')


    const [userNick, setUserNick] = useState(user_nick)
    const [userPw, setUserPw] = useState(user_pw)
    const [pwMessage, setPwMessage] = useState("");


    // const user_sns = sessionStorage.getItem('user_sns')

    const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }

    // 회원탈퇴
    const onRemove = () => {
        if (window.confirm('회원탈퇴를 하시겠습니까?')) {
            if (window.confirm('진짜 하게?')) {
                alert('이용해주셔서 감사합니다')
                const requestData = { user_id: user_id };
                console.log(requestData);
                axios.post(`spring/road/delete`, requestData, config)
                    .then((res) => {
                        console.log(res.data);
                        sessionStorage.clear();
                        setIsLoggendIn(false)
                        nav('/')
                    })
            }
        } else {
        }
    }

    // 회원정보수정
    const ModNick = () => {
        if (userNick === "") { return alert("닉네임을 입력해주세요") }
        const requestData = {
            user_id: user_id,
            user_nick: userNick,
            user_pw: userPw,
        };
        console.log('버튼 클릭했을 때:', requestData);
        axios.post(`spring/road/update`, requestData, config)
            .then((res) => {
                console.log(res.data);
                // sessionStorage.clear();
                user_id = sessionStorage.setItem('user_id', res.data.loginUser.user_id)
                user_nick = sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)
                user_pw = sessionStorage.setItem('user_pw', res.data.loginUser.user_pw)
                alert('수정완료')
                nav('/')
            })
    }


    return (
        <div className='MypageContainer'>
            <img id='profile' src={[ProfileLogo]} width='250px' />
            <div>
            </div><br />
            <div id='InfoContainer'>
                <h1 id='InfoTxt'>회원정보수정</h1>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><label className='ModifyPageLabel'>닉네임</label></td>
                            <td><input className='Modifyinput' onChange={(e) => setUserNick(e.target.value)} type='text' defaultValue={user_nick}></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label className='ModifyPageLabel'>비밀번호</label></td>
                            <td>
                                {sessionStorage.getItem('user_sns') == null ?
                                    <input onChange={(e) => setUserPw(e.target.value)} className='Modifyinput' type='password' value={12345678912} />
                                    :
                                    <input onChange={(e) => setUserPw(e.target.value)} className='Modifyinput' type='password' defaultValue={123456789} />
                                }
                                <p className="JoinMessage"> {pwMessage} </p>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <br /><br />
            <div>
                <a href="" onClick={onRemove}>회원탈퇴</a>
            </div>
            <br />
            <div className='ModifyPageBtnContainer'>
                <Link to='/mypage'><button className='ModifyPageBtn' id='ModifyBackBtn'>뒤로가기</button></Link>
                <button onClick={ModNick} className='ModifyPageBtn' id='ModifyBtn'>수정하기</button>
            </div>
        </div>
    )
}

export default ModifyPage