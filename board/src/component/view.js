import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './css/view.css';
import Comment from "./comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import Category from "./category";
function View(props) {

    const { id } = useParams();
    const [post, setPost] = useState('');
    // console.log(post)
    const login = props.login;
    // const heart = props.heart;
    const loginUser = sessionStorage.userId;
    const [heart, setheart] = useState(false);
    const [viewc, setViewC] = useState('');
    const boardId = id;
    const [likes, setLikes] = useState('');
    // const [like, setLike] = useState(false);
    const [heartCnt, setHeartCnt] = useState('');
    const viewcc = () => {
        axios.post(`http://localhost:8000/board/post/view/${id}`, {
            view_cnt: viewc,
            id: id
        })
            .then(function (result) {
                setViewC(result.data);
            })
            .catch(err => console.log(err));
    }
    const heart_cnt = () => {
        axios.get(`http://localhost:8000/heart/${boardId}`)
            .then((result) => {
                setLikes(result.data);
            })
            .catch(err => console.log(err));
    }
    useEffect(function () {
        const post = () => {
            axios
                .get(`http://localhost:8000/board/post/${id}`)
                .then(function (result) {
                    setPost(result.data);
                })
                .catch(err => console.log(err));
        }
        axios.get(`http://localhost:8000/heart/cnt/${boardId}`)
            .then(function (result) {
                setHeartCnt(result.data);
            })
            .catch(err => console.log(err));
        post();
        heart_cnt();
    }, []);

    useEffect(() => {
        viewcc();
    }, []);
    const clickHeart = (userName) => {
        if (!login) {
            window.alert('로그인이 필요합니다.')
            return document.location.href = '/login'
        }
        //window.alert('좋아요')
        setheart(true);
        // localStorage.setItem('like', like)
        // setLike(heart);
        // console.log('like:', like);
        // console.log('heartLike(click):', heart);
        if (userName === loginUser) {

            setheart(false);
        }
        axios.post(`http://localhost:8000/board/post/heart/plus/${id}`, {
            likes: heart,
            id: id
        }).then(() => {
            // alert('좋아요');
            // return window.location.replace(`/post/${id}`)
        }).catch(err => console.log(err));
        // console.log('like', like)
        // const user = like.userName;
        // console.log('like.userName', like.userName);
        // console.log('user', user);
        // console.log('userName', userName);
        // console.log('boardId', boardId)
        // console.log('id', id)
        // console.log('loginUser', loginUser)
        if (boardId === id && userName === loginUser) {
            axios.post(`http://localhost:8000/heart/plus/${boardId}`, {
                boardId: id,
            }).then(() => {
                alert('좋아요');
                return window.location.replace(`/post/${id}`)
            }).catch(err => console.log(err));
        }
        else {
            axios.post('http://localhost:8000/heart', {
                boardId: id,
                userName: loginUser,
                like_cnt: 1
            }).then(() => {
                alert('좋아요');
                return window.location.replace(`/post/${id}`)
            }).catch(err => console.log(err));
        }

    }


    const Heartclick = () => {
        setheart(false);
        // setheart(false);
        // localStorage.removeItem('like')
        // console.log('heartLike(no):', heart);
        window.alert('좋아요를 취소하셨습니다.')
        axios.post(`http://localhost:8000/board/post/heart/${id}`, {
            likes: heart,
            id: id
        }).then(() => {
            // alert('좋아요 취소');
            // return window.location.replace(`/post/${id}`)
        })
        axios.post(`http://localhost:8000/heart/minus/${boardId}`, {
            boardId: id
        }).then(() => {
            alert('좋아요 취소');
            return window.location.replace(`/post/${id}`)
        }).catch(err => console.log(err));
    }

    const deletePost = () => {
        window.alert('정말 삭제하시겠습니까?');

        axios.post(`http://localhost:8000/board/post/${id}`)
            .then(() => {
                alert('게시글이 삭제되었습니다.');
                return window.location.replace('/');
            })
            .catch(err => console.log(err))
            .then(function () {
                // always executed
            });
    }
    console.log('heartLike(click):', heart);
    if (post === null) {
        return <h1>게시글을 받고 있습니다.</h1>
    }
    console.log(id)
    return (
        <div className="view-body">
            <div className="view-area">
                <Category className="view-category" />
                <div className="view-area-box">
                    <div className="view-box">
                        <div>
                            {post && post.length > 0 ?
                                post.map(function (post, key) {
                                    return (
                                        <div key={key} className="view-info">
                                            <div className="view-category">

                                                <div className="view-category">{post.cateName}</div>
                                            </div>
                                            <div className="view-title">
                                                <div className="view-right">{post.title}</div>
                                            </div>
                                            <div className="view-writer">
                                                <div className="view-user">{post.username}</div>
                                                <div className="view-datetime">{post.datetime}</div>
                                                <div className="view-viewcnt"> 조회수 {post.view_cnt + 1}</div>
                                            </div>
                                            <div className="view-content">
                                                <div className="view-right">
                                                    <p className="view-textarea" disabled>{post.content}</p></div>
                                            </div>
                                            <div className="view-img">
                                                <div>
                                                    <img src={post.image} className="view-right" style={{ 'width': '250px', 'height': '250px', 'objectFit': 'cover' }}></img>
                                                </div>
                                            </div>
                                            <div>

                                                <div className="view-heart-viewcnt">
                                                    {likes && likes.length > 0 ?
                                                        likes.map(function (likes, key) {
                                                            console.log(likes.boardId)
                                                            return (
                                                                <div key={key}>
                                                                    <div>
                                                                        {likes.userName === loginUser && likes.like_cnt === 1 ?
                                                                            <FontAwesomeIcon icon={solidHeart} onClick={Heartclick} style={{ 'color': 'red' }} className="like-click" />
                                                                            : <FontAwesomeIcon icon={regularHeart} onClick={(e) => clickHeart(likes.userName)} className="like-click" style={{ 'color': 'black' }} />
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : <FontAwesomeIcon icon={regularHeart} onClick={clickHeart} style={{ 'color': 'red' }} className="like-click" />}
                                                    {heartCnt && heartCnt.length > 0 ?
                                                        heartCnt.map(function (heartCnt, key) {
                                                            return (
                                                                <div key={key} className="heart-viewcnt"> 좋아요 {heartCnt.cnt}</div>
                                                            )
                                                        }) : <></>}


                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                <div>데이터가 없습니다.</div>}
                        </div>
                        {login === true ?
                            <div className="view-btn">
                                <Link to={`/update/${id}`}><button className="view-button">수정</button></Link>
                                <button className="view-button" onClick={deletePost}>삭제</button>
                            </div> : <></>}

                    </div>
                    <Comment login={login} />
                </div>
            </div>
        </div>
    );
}
export default View;