import { useState } from "react";

function Login() {
    const [userid, setUserId] = useState('');
    const [userpw, setUserPw] = useState('');

    const login = () => {
        if (userid === "" || userpw === "") {
            window.alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
    }
    return (
        <div className='login-div'>
            <h4> LOGIN </h4>
            <form className="login-form">
                <div className='login-input-div'>
                    <div className="login-input">
                        <input type='text' name='id' onChange={() => this._changeID()} autoComplete="off" placeholder="아이디" />
                    </div>
                </div>
                <div className='login-input-div'>
                    <div className="login-input">
                        <input type='password' name='password' placeholder="비밀번호" onChange={() => this._changePW()} />
                    </div>
                </div>
                <div className='login-submit'>
                    <div> <input type='button' value='로그인' onClick={() => this._selectUserData()} /> </div>
                </div>
            </form>
        </div>
    );
}
export default Login;