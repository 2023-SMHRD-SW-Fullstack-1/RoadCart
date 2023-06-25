import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const JoinPage = ({ setIsLoggendIn }) => {

    const nav = useNavigate(0)

    // 초기값 세팅
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');

    // 오류메세지 상태 저장
    const [idMessage, setIdMessage] = useState("");
    const [nickMessage, setNickMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [pwConfirmMessage, setPwConfirmMessage] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isNick, setIsNick] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwConfirm, setIsPwConfirm] = useState(false);

    const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }

    const onchangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId)
    }

    const onChangeNick = (e) => {
        const currentNick = e.target.value;
        setNick(currentNick)

        if (currentNick.length < 2 || currentNick.length > 8) {
            setNickMessage("닉네임은 2글자 이상 8글자 이하로 입력해주세요!");
            setIsNick(false);
        } else {
            setNickMessage("사용가능한 닉네임 입니다.");
            setIsNick(true);
        }
    }

    const onChangePw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        const pwRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!pwRegExp.test(currentPw)) {
            setPwMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            );
            setIsPw(false);
        } else {
            setPwMessage("안전한 비밀번호 입니다.");
            setIsPw(true);
        }
    };

    const onChangePwConfirm = (e) => {
        const currentPwConfirm = e.target.value;
        setPwConfirm(currentPwConfirm);
        if (pw !== currentPwConfirm) {
            setPwConfirmMessage("에잇~ 비밀번호가 똑같지 않아요!");
            setIsPwConfirm(false);
        } else {
            setPwConfirmMessage("똑같은 비밀번호를 입력했습니다.");
            setIsPwConfirm(true);
        }
    };

    // 회원가입 버튼
    const joinBtn = () => {
        if (pw == pwConfirm) {
            const requestData = {
                user_id: id,
                user_nick: nick,
                user_pw: pw,
            };
            axios.post(`spring/road/join`, requestData, config)
                .then((res) => {
                    console.log(res.data);
                    sessionStorage.setItem('user_id', id)
                    sessionStorage.setItem('user_nick', nick)
                    alert('회원가입성공')
                    nav('/')
                })
        } else {
            alert('입력한 정보를 다시 확인해주세요')
        }
    }

    // 입력한 키가 Enter일 경우 가입하기 버튼 클릭한 것과 동일한 동작 실행
    const activeEnter = (e) =>{
        if(e.key == 'Enter'){
            joinBtn()   // Enter 입력이 되면 클릭 이벤트 실행
        }
    }


    return (
        <div className='JoinPageContainer'>
            <div className='login-container'>
                <div id='login-text'>
                    <h1 id='loginLogo'>SIGN UP</h1>
                    <p className='LoginPageSubTitle' id='travelPlannertxt'>나만의 여행일정 플래너 - 길바구니</p>
                </div><br /><br />
            </div>
            <div className="JoinInputBox">
                <label htmlFor="id">아이디</label>
                <input className="JoinInput" name='id' onChange={onchangeId} type="text" placeholder='4-12사이 대소문자 또는 숫자만'/>
                <p className="JoinMessage"> {idMessage} </p>
            </div>
            <div className="JoinInputBox">
                <label htmlFor="nick">닉네임</label>
                <input className="JoinInput" name='id' onChange={onChangeNick} type="text" placeholder='2글자 이상 8글자 이하로 입력' />
                <p className="JoinMessage"> {nickMessage} </p>
            </div>
            <div className="JoinInputBox">
                <label htmlFor="pw">비밀번호</label>
                <input className="JoinInput" name='pw' onChange={onChangePw} type="password" placeholder='숫자+영문자+특수문자 조합으로 8자리 이상 입력' />
                <p className="JoinMessage"> {pwMessage} </p>
            </div>
            <div className="JoinInputBox">
                <label htmlFor="pw">비밀번호 확인</label>
                <input onKeyDown={activeEnter} className="JoinInput" name='pw' type="password" onChange={onChangePwConfirm} placeholder="비밀번호 재입력" />
                <p className="JoinMessage"> {pwConfirmMessage} </p>
            </div>
            <br />
            <button onClick={joinBtn} className="loginBtn" role="button" >회원가입</button><br />
            <Link to='/login'><button className="loginBtn" role="button"
                style={{ backgroundColor: 'black' }}>뒤로가기</button></Link>


        </div>
    )
}

export default JoinPage