import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../css/mypage.css';

function Mypage() {
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState([]);

    const [clickPost, setClickPost] = useState(false);
    const [clickComment, setClickComment] = useState(false);
    const loginUser = sessionStorage.userId;
    const userId = sessionStorage.userId;
    const username = sessionStorage.userId;
    const onClickPost = () => {
        setClickPost(true);
        console.log(clickPost)
        setClickComment(false)
    }
    const onClickComment = () => {
        setClickComment(true);
        console.log(clickComment)
        setClickPost(false)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/board/list/${username}`)
            .then((response) => {
                setPost(response.data)
            })
            .catch(err => console.log(err));

        axios.get(`http://localhost:8000/comment/${userId}`)
            .then((response) => {
                setComment(response.data)
            })
            .catch(err => console.log(err));

    }, [])
    return (
        <div className="mypage-area">
            <div className="mypage-area-div " >
                <h4>{loginUser} 페이지</h4>
                <div className="user-mypage"></div>
                <div className="mypage-button">
                    <button className="mypage-btn" onClick={onClickPost}>내가 작성한 글</button>
                    <button className="mypage-btn" onClick={onClickComment}>내가 작성한 댓글</button>
                </div>

                {clickPost === true && clickComment === false ?
                    <div className="mypage-div">
                        {post && post.length > 0 ?
                            post.map((board, id) => {
                                const view_url = '/post/' + board.id;
                                return (
                                    <div className="mypage-view" key={id}>
                                        {loginUser == board.username ?
                                            <div className="mypage-list">
                                                <div className="mypage-image"><Link to={view_url}><img src={board.image} className="mypage-img" style={{ 'width': '200px', 'height': '200px', 'objectFit': 'cover' }}></img></Link></div>
                                                <div className="mypage-title"><Link to={view_url}>{board.title}</Link></div>
                                                <div className="mypage-user">{board.username}</div>
                                            </div>
                                            : <></>}

                                    </div>
                                )

                            })

                            :
                            <div>데이터가 없습니다.</div>
                        }

                    </div>
                    : <></>
                }
                {clickComment === true && clickPost === false ?
                    <div className="">
                        {comment && comment.length > 0 ?
                            comment.map((comment, key) => {
                                const view_url = '/post/' + comment.boardId;
                                return (
                                    <div className="comment-list-mypage" key={key}>
                                        {comment.userId == loginUser ?
                                            <div className="commnet-mypage">
                                                <div className="mypage-comment"><Link to={view_url}>{comment.comment}</Link></div>
                                                <div className="mypage-user">{comment.userId}</div>
                                            </div>
                                            : <></>}

                                    </div>
                                )
                            })
                            : <div>댓글이 없습니다.</div>}
                    </div>
                    : <></>
                }

            </div>
        </div>
    );

}
export default Mypage;