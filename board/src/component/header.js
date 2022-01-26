import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

function Header(props) {
    const login = props.login;
    const loginUser = sessionStorage.userId;



    const onLogout = () => {
        sessionStorage.removeItem('userId')
        document.location.href = '/'
    }

    return (
        <div className='header-div'>
            <div className='header-area'>
                <div className='header-left'>
                    <Link to="/"><FontAwesomeIcon icon={faHome} />home</Link>
                </div>

                <div className='header-right'>
                    {login === false ?
                        <div>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/join">회원가입</Link></li>
                        </div>
                        : <div>
                            <Link to="/write" ><FontAwesomeIcon icon={faPen} />글쓰기</Link>
                            <Link to="/mypage">{loginUser}</Link>
                            <button onClick={onLogout}>로그아웃</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}


export default Header;