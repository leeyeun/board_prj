import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from 'react-modal';
import ModifyComment from "./ModifyComment";
function Comment_list() {
    const [comment, setComment] = useState('');
    const loginUser = sessionStorage.userId;
    const { id } = useParams();
    const [commentId, setCommentId] = useState('')
    const [modifyClick, setModifyClick] = useState(false);
    const [modifyName, setmodifyName] = useState('');

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
            })
                .then(() => {
                    alert('댓글이 수정되었습니다.');
                    return window.location.replace(`/post/${id}`);
                }).catch(err => console.log(err))
        }
        else {
            alert('취소되었습니다.')
        }

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

    useEffect(function () {
        axios.get('http://localhost:8000/comment')
            .then(function (result) {
                setComment(result.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (

        <div>
            {comment && comment.length > 0 ?
                comment.map(function (comment, key) {
                    return (
                        <div className="comment-list" key={key} >
                            {comment.boardId == id ?
                                <div>
                                    <div className="comment-comId">댓글 번호 : {comment.comId}</div>
                                    <div className="comment-comment">댓글 :{comment.comment}</div>
                                    <div className="comment-user">작성자 : {comment.userId}</div>
                                    <div className="comment-boardid">게시글 번호 : {comment.boardId}</div>
                                    <br />
                                    <div>
                                        {loginUser === comment.userId ?
                                            <div>
                                                <button onClick={() => clickModify(comment.comId)}>수정</button>
                                                <button onClick={() => deleteComment(comment.comId)}>삭제</button>
                                            </div> : <></>}
                                    </div>
                                </div>
                                : <></>
                            }
                            {modifyClick && comment.boardId == id && comment.comId == commentId ?
                                <div>
                                    <textarea type="text" defaultValue={comment.comment} onChange={handleModifyComment}></textarea>
                                    <button onClick={() => modifyComment(comment)}>확인</button>
                                </div>
                                : <></>
                            }
                        </div>

                    )
                })
                : <div>아직 댓글이 없습니다. </div>
            }
        </div>
    );
}

export default Comment_list;