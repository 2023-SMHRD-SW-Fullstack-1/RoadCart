import React from 'react'
import { GoogleLogin } from '@react-oauth/google'


const GoogleExample = () => {
    return (
        <>
            <GoogleLogin
                buttonText="google login"
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </>
    )
}

export default GoogleExample