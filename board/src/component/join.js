import axios from "axios";
import { useState } from "react";
import './css/join.css';

function Join() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [confirmpw, setConfirmPw] = useState('');
    const [userName, setUserName] = useState('');
    const [userNick, setUserNick] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const onIdHandler = (e) => {
        setUserId(e.currentTarget.value);
    }
    const onPwHandler = (e) => {
        setUserPw(e.currentTarget.value);
    }
    const onNameHandler = (e) => {
        setUserName(e.currentTarget.value);
    }
    const onNickHandler = (e) => {
        setUserNick(e.currentTarget.value);
    }
    const onNumberHandler = (e) => {
        setUserNumber(e.currentTarget.value);
    }
    const onEmailHandler = (e) => {
        setUserEmail(e.currentTarget.value);
    }
    const onConfirmPwHandler = (e) => {
        setConfirmPw(e.currentTarget.value);
    }
    const onSubmitHandler = () => {
        axios.post('http://localhost:8000/user/join', {
            userId: userId,
            userPw: userPw,
            userName: userName,
            userNick: userNick,
            userNumber: userNumber,
            userEmail: userEmail

        }).then(() => {
            alert('회원가입이 되었습니다!');
            document.location.href = '/'
        }).catch(err => console.log(err));
    };
    // const onSubmitHandler = (e) => {
    //     e.preventDefault();

    //     if (userpw !== confirmpw) {
    //         return alert('비밀번호 확인이 일치하지 않습니다.');
    //     }
    //     let body = {
    //         userid: userid,
    //         userpw: userpw,
    //         username: username,
    //         usernick: usernick,
    //         usernumber: usernumber,
    //         useremail: useremail
    //     };

    // }

    return (
        <div className="sign-box">
            <h4> JOIN </h4>
            <form className="sign-form">
                <div className="sign-info">
                    <div className="sign-label">
                        <label>아이디</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_id" placeholder="6~20자 영문자를 사용하세요" value={userId} onChange={onIdHandler} />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>비밀번호</label>
                    </div>
                    <div className="sign-input">
                        <input type='password' name="signup_password" placeholder="6~20자 영문자를 사용하세요" value={userPw} onChange={onPwHandler} />
                    </div>

                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>비밀번호 확인</label>
                    </div>
                    <div className="sign-input">
                        <input type='password' name="signup_pswCheck" placeholder="비밀번호를 한 번 더 입력해주세요" value={confirmpw} onChange={onConfirmPwHandler} />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>이름</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_name" placeholder="이름" value={userName} onChange={onNameHandler} />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>닉네임</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_nickname" placeholder="닉네임" value={userNick} onChange={onNickHandler} />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>번호</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_number" placeholder="번호" value={userNumber} onChange={onNumberHandler} />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>이메일</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_email" placeholder="이메일" value={userEmail} onChange={onEmailHandler} />
                    </div>
                </div>
                <div className="sign-submit">
                    <button className="join-btn" onClick={onSubmitHandler} >가입하기</button>
                </div>
            </form>
        </div>
    );
}
export default Join;