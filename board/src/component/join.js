import { useState } from "react";

function Join() {
    const [userid, setUserId] = useState('');
    const [userpw, setUserPw] = useState('');
    const [username, setUserName] = useState('');
    const [usernick, setUserNick] = useState('');
    const [usernumber, setUserNumber] = useState('');
    const [useremail, setUserEmail] = useState('');

    return (
        <div className="sign-box">
            <h4> JOIN </h4>
            <form className="sign-form">
                <div className="sign-info">
                    <div className="sign-label">
                        <label>아이디</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_id" placeholder="6~20자 영문자를 사용하세요" />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>비밀번호</label>
                    </div>
                    <div className="sign-input">
                        <input type='password' name="signup_password" placeholder="6~20자 영문자를 사용하세요" />
                    </div>

                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>비밀번호 확인</label>
                    </div>
                    <div className="sign-input">
                        <input type='password' name="signup_pswCheck" placeholder="비밀번호를 한 번 더 입력해주세요" />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>이름</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_name" placeholder="이름" />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>닉네임</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_nickname" placeholder="닉네임" />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>번호</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_number" placeholder="번호" />
                    </div>
                </div>
                <div className="sign-info">
                    <div className="sign-label">
                        <label>이메일</label>
                    </div>
                    <div className="sign-input">
                        <input type='text' name="signup_email" placeholder="이메일" />
                    </div>
                </div>
                <div className="sign-submit">
                    <input type='button' value='가입하기' />
                </div>
            </form>
        </div>
    );
}
export default Join;