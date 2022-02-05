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
                    <Link to="/"><FontAwesomeIcon icon={faHome} className='fahome' /> home</Link>
                </div>

                <div className='header-right'>
                    {login === false ?
                        <div className='header-right-login'>
                            <li className='header-login'><Link to="/login">로그인</Link></li>
                            <li className='header-login'><Link to="/join">회원가입</Link></li>
                        </div>
                        : <div className='header-right-click'>
                            <div className='wirte-click'><Link to="/write" ><FontAwesomeIcon icon={faPen} /> 글쓰기</Link></div>
                            <div className='select'>
                                <div className='user-click'>{loginUser}</div>
                                <ul className='option-list'>
                                    <li className='option'><Link to="/mypage" style={{ 'width': '120px' }}>My Page</Link></li>
                                    <li className='option'><button className='logout-button' onClick={onLogout}>로그아웃</button></li>
                                </ul>
                            </div>

                            {/* <button onClick={onLogout}>로그아웃</button> */}

                        </div>
                    }
                </div>
            </div>
        </div>
    );
}


export default Header;