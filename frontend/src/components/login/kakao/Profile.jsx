import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [userId, setUserId] = useState();
    const [nickname, setNickName] = useState();
    const [profileImage, setProfileImage] = useState();

    const getProfile = async () => {

        
        try {
            let data = await window.Kakao.API.request({
                url: "/v2/user/me",
            })

            axios.post('http://localhost:3000/profile',{
                username : data.profile.nickname,
                email : data.kakao_account.email,
            })
            .then((res)=>{
                console.log('user profile', res.data.user);
            })


            // 사용자 정보 변수에 저장
            setUserId(data.kakao_account.email);
            setNickName(data.properties.nickname);
            setProfileImage(data.properties.profile_image);
            console.log('email :', data.kakao_account.email);
            console.log('nick :', data.properties.nickname);
            console.log(data);
        } catch (err) {
            console.log(err);
        }

    }



    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div>
            <img id='profileImg' src={profileImage} width='300px'></img>
            <h3>{nickname}</h3>
            <h3>{userId}</h3>
        </div>
    )
}

export default Profile