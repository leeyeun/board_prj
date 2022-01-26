import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Mypage() {
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState([]);

    const [clickPost, setClickPost] = useState(false);
    const [clickComment, setClickComment] = useState(false);
    const loginUser = sessionStorage.userId;

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
        axios.get('http://localhost:8000/board/list')
            .then((response) => {
                setPost(response.data)
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:8000/comment')
            .then((response) => {
                setComment(response.data)
            })
            .catch(err => console.log(err));

    }, [])
    return (
        <div className="list-area">
            <div className="list-div" >
                <h4>마이 페이지</h4>
                <h5>아직 수정중!! </h5>
                <div>{loginUser}</div>
                <button onClick={onClickPost}>내가 작성한 글</button>
                <button onClick={onClickComment}>내가 작성한 댓글</button>
                {clickPost === true && clickComment === false ?
                    <div>
                        {post && post.length > 0 ?
                            post.map((board, id) => {
                                const view_url = '/post/' + board.id;
                                return (
                                    <div className="mypage-view" key={id}>
                                        {loginUser == board.user ?
                                            <div>
                                                <div className="mypage-title"><Link to={view_url}>{board.title}</Link></div>
                                                <div className="mypage-content">{board.content}</div>
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
                    <div>
                        {comment && comment.length > 0 ?
                            comment.map((comment, key) => {
                                return (

                                    <div key={key}>
                                        {comment.userId == loginUser ?
                                            <div>
                                                <div>{comment.comment}</div>
                                                <div>{comment.userId}</div>
                                            </div>
                                            : <></>}

                                    </div>
                                )
                            })
                            : <div>댓글이 없다.</div>}
                    </div>
                    : <></>
                }

            </div>
        </div>
    );

}
export default Mypage;