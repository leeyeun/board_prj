import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Comment_list from "./comment-list";
import './css/comment.css';

function Comment(props) {
    const [comment, setComment] = useState('');

    const login = props.login;
    const loginUser = sessionStorage.userId;
    const { id } = useParams();
    const [viewcnt, setViewcnt] = useState('');
    //const ref = useRef < HTMLTextAreaElement > (null);
    const onCommentHandler = (e) => {
        setComment(e.currentTarget.value);
    }
    // const handleSetTab = (e) => {

    // };
    const [commentId, setCommentId] = useState('')
    const [modifyClick, setModifyClick] = useState(false);
    const [modifyName, setmodifyName] = useState('');
    const [boardUsername, setboardUsername] = useState('');
    const textRef = useRef();
    const resize = () => {
        const obj = textRef.current;
        obj.style.height = 'auto';
        obj.style.height = obj.scrollHeight + 'px';
    }

    const onCommentSubmit = () => {
        if (comment === "") {
            alert('댓글을 작성하세요.')
            return
        }
        if (login === false) {
            alert('로그인을 하세요.')
            document.location.href = '/login'
        }
        axios.post('http://localhost:8000/post/comment', {
            comment: comment,
            userId: loginUser,
            boardId: id,

        }).then(() => {
            alert('댓글이 작성되었습니다.');
            return window.location.replace(`/post/${id}`)
        }).catch(err => console.log(err));
    }

    const boardId = id;
    useEffect(() => {
        axios.get(`http://localhost:8000/comment/list/${boardId}`)
            .then(function (result) {
                setComment(result.data);
            })
            .catch(err => console.log(err));
        view();
        //boardUser();
    }, []);

    const view = () => {

        axios.get(`http://localhost:8000/comment/post/view/${boardId}`)
            .then(function (result) {
                setViewcnt(result.data);
            })
            .catch(err => console.log(err));
    }
    const boardUser = () => {
        axios.get(`http://localhost:8000/board/post/${id}`)
            .then(function (result) {
                setboardUsername(result.data);
            })
            .catch(err => console.log(err));
        const useruser = boardUsername.username;
        // console.log(useruser)
        // console.log('boardUsername :', boardUsername);
        // console.log('username :', boardUsername.username);
    }



    return (

        <div className="area-comment">

            {/* {boardUsername && boardUsername.length > 0 ?
                boardUsername.map(function (boardUsername, key) {
                    // console.log(boardUsername.username);
                    const useruser = boardUsername.username;
                    return (
                        <div key={key}>작성자 : {boardUsername.username}</div>
                    )
                })

                : <></>
            } */}

            {/* <h3>댓글</h3> */}
            {viewcnt && viewcnt.length > 0 ?
                viewcnt.map(function (viewcnt, key) {
                    return (
                        <div key={key}>
                            <h3>댓글 {viewcnt.cntview}</h3>
                        </div>

                    )
                })
                : <></>
            }
            <div className="comment-write">
                <div className="comment_inbox">
                    <div className="comment-user">{loginUser}</div>
                    <textarea className="comment-textarea"
                        ref={textRef}
                        type="text" name="comment-textarea"
                        placeholder="100자 이내의 글을 입력하세요"
                        onChange={(e) => onCommentHandler(e)}
                        onKeyDown={resize}
                        onKeyUp={resize}></textarea>
                </div>
                <div className="comment_attach">
                    <button className="comment-button" onClick={onCommentSubmit}>등록</button>
                </div>

            </div>

            <Comment_list />
        </div>
    );
}
export default Comment;