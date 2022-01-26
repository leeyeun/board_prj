import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Comment_list from "./comment-list";

function Comment(props) {
    const [comment, setComment] = useState('');

    const login = props.login;
    const loginUser = sessionStorage.userId;
    const { id } = useParams();

    const onCommentHandler = (e) => {
        setComment(e.currentTarget.value);
    }

    const onCommentSubmit = () => {
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

    return (
        <div>
            <h4>댓글</h4>
            <div className="comment-write">
                <textarea type="text" name="comment-textarea" rows='5' placeholder="100자 이내의 글을 입력하세요" onChange={onCommentHandler}></textarea>
                <button className="comment-button" onClick={onCommentSubmit}>등록</button>
            </div>
            <Comment_list />
        </div>
    );
}
export default Comment;