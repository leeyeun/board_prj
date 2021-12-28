import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='header-div'>
            <div><Link to="/">home</Link></div>
            <div><input /></div>
            <div><Link to="/login">로그인</Link></div>
            <div><Link to="/join">회원가입</Link></div>
        </div>
    );
}


export default Header;