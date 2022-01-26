import axios from "axios";
import { useEffect, useState } from "react";
import './css/login.css';
function Login() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    const onIdHandler = (e) => {
        setInputId(e.target.value)
    }
    const onPwHandler = (e) => {
        setInputPw(e.target.value)
    }
    const onSubmitLogin = () => {
        console.log('id : ', inputId);
        console.log('pw : ', inputPw);
        axios.post('http://localhost:8000/onlogin', null, {
            params: {
                'userId': inputId,
                'userPw': inputPw,
            }
        })
            .then(res => {
                console.log(res);
                console.log('res.data.userId :: ', res.data.userId)
                console.log('res.data.msg :: ', res.data.msg)
                if (res.data.userId === undefined) {
                    console.log('======================', res.data.msg)
                    alert('입력하신 id 가 일치하지 않습니다.')
                    return
                } else if (res.data.userId === null) {
                    console.log('======================', '입력하신 비밀번호 가 일치하지 않습니다.')
                    alert('입력하신 비밀번호 가 일치하지 않습니다.')
                    return
                } else if (res.data.userId === inputId) {
                    console.log('======================', '로그인 성공')
                    sessionStorage.setItem('userId', inputId)
                    document.location.href = '/'
                }

            }).catch(err => console.log(err));

    }

    const onCheckEnter = (e) => {
        if (e.key === 'Enter') {
            onSubmitLogin()
        }
    }
    useEffect(() => {
        axios.get('http://localhost:8000/login')
            .then(res => console.log(res))
            .catch()
    }, [])

    return (
        <div className='login-div'>
            <h4> LOGIN </h4>
            <form className="login-form" onKeyPress={onCheckEnter}>
                <div className='login-input-div'>
                    <div className="login-input">
                        <input type='text' name='id' value={inputId} onChange={onIdHandler} autoComplete="off" placeholder="아이디" />
                    </div>
                </div>
                <div className='login-input-div'>
                    <div className="login-input">
                        <input type='password' name='password' placeholder="비밀번호" value={inputPw} onChange={onPwHandler} />
                    </div>
                </div>
                <div className='login-submit'>
                    <div> <input type='button' value='로그인' onClick={onSubmitLogin} /> </div>
                </div>
            </form>
        </div>
    );
}
export default Login;