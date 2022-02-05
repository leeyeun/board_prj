import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from 'react-modal';
import ModifyComment from "./ModifyComment";
import './css/comment.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
function Comment_list() {
    const [comment, setComment] = useState('');
    const loginUser = sessionStorage.userId;
    const { id } = useParams();
    const [commentId, setCommentId] = useState('')
    const [modifyClick, setModifyClick] = useState(false);
    const [modifyName, setmodifyName] = useState('');
    const [viewcnt, setViewcnt] = useState('');
    const [boardUsername, setboardUsername] = useState('');
    const textRef = useRef();
    const resize = () => {
        const obj = textRef.current;
        obj.style.height = 'auto';
        obj.style.height = obj.scrollHeight + 'px';
    }

    const handleModifyComment = (e) => {
        setmodifyName(e.currentTarget.value);
    }

    const clickModify = (comId) => {
        setCommentId(comId);
        console.log(comId);
        setModifyClick(true);
    }
    const modifyComment = (comment) => {
        let now = new Date();
        console.log(now)
        console.log(comment.comId)
        console.log(modifyName);
        if (window.confirm('수정하시겠씁니꽈')) {
            axios.post(`http://localhost:8000/comment/modify/${comment.comId}`, {
                comment: modifyName,
                comId: comment.comId,
            }).then(() => {
                alert('댓글이 수정되었습니다.');
                return window.location.replace(`/post/${id}`);
            }).catch(err => console.log(err))
        }
        else {
            alert('취소되었습니다.')
        }

    }
    const cancelComment = () => {
        setModifyClick(false);
    }

    const deleteComment = async (comId) => {
        window.confirm(`선택하신 댓글 번호가 ${comId}이 맞습니까?`);
        window.confirm('정말 삭제하시겠습니까?');
        console.log(comId);

        await axios.post(`http://localhost:8000/comment/${comId}`, {
            comId: comId,
        })
            .then(() => {
                alert('댓글이 삭제되었습니다.');
                return window.location.replace(`/post/${id}`);
            }).catch(err => console.log(err))
            .then(function () {
                // always executed
            });
    }
    const boardId = id;
    useEffect(function () {

        axios.get(`http://localhost:8000/comment/list/${boardId}`)
            .then(function (result) {
                setComment(result.data);
            })
            .catch(err => console.log(err));
        //view();
        boardUser();
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
    }
    // console.log(viewcnt)
    return (
        <div>
            {comment && comment.length > 0 ?
                comment.map(function (comment, key) {
                    return (
                        <div className="comment-area" key={key} >
                            {comment.boardId == id ?
                                <div className="comment-list-area">
                                    {modifyClick && comment.boardId == id && comment.comId == commentId ?
                                        <div className="comment-list">
                                            <div className="comment_inbox">
                                                <div className="comment-user">{loginUser}</div>
                                                <textarea type="text"
                                                    className="comment-list-textarea"
                                                    ref={textRef}
                                                    defaultValue={comment.comment}
                                                    onChange={(e) => handleModifyComment(e)}
                                                    onKeyDown={resize}
                                                    onKeyUp={resize}></textarea>
                                                <button onClick={() => modifyComment(comment)}>확인</button>
                                                <button onClick={() => cancelComment()}>취소</button>
                                            </div>
                                        </div>
                                        : <div className="list-comment">
                                            <div className="comment-view">
                                                <div className="comment-nick-name">{comment.userId}</div>
                                                <p className="comment-comment"
                                                    ref={textRef}
                                                    disabled
                                                >{comment.comment}</p>
                                                {/* <div>{comment.comment}</div> */}
                                                <div className="comment-datetime">{comment.datetime}</div>
                                            </div>
                                            <div>
                                                {loginUser === comment.userId ?
                                                    <div className="select-comt">
                                                        <div className="icon-clikc"><FontAwesomeIcon icon={faEquals} style={{ 'color': '#979797' }} /></div>
                                                        <ul className="option-list">
                                                            <li className='option'><button className="comment-btn" onClick={() => clickModify(comment.comId)}>수정</button></li>
                                                            <li className='option'><button className="comment-btn" onClick={() => deleteComment(comment.comId)}>삭제</button></li>
                                                        </ul>
                                                    </div>
                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                    }
                                    {/* <div className="comment-comId">댓글 번호 : {comment.comId}</div> */}
                                    {/* <div className="comment-nick-name">{comment.userId}</div>
                                    <div className="comment-comment">{comment.comment}</div>
                                    <div className="comment-datetime">{comment.datetime}</div> */}
                                    {/* <img src={image}></img> */}

                                </div>
                                : <></>
                            }
                            {/* {modifyClick && comment.boardId == id && comment.comId == commentId ?
                                <div>
                                    <textarea type="text" defaultValue={comment.comment} onChange={handleModifyComment}></textarea>
                                    <button onClick={() => modifyComment(comment)}>확인</button>
                                </div>
                                : <></>
                            } */}
                        </div>
                    )
                })
                : <></>
            }
        </div>
    );
}

export default Comment_list;