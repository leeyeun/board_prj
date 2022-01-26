import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Update() {
    const [post, setPost] = useState('')
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [modifyPost, setModifyPost] = useState({
        title: '',
        content: ''
    });
    const { id } = useParams();

    const postUpdate = (e) => {
        e.preventDefault();
        console.log(modifyPost.title)
        console.log(modifyPost.content)
        console.log(id)
        axios.post(`http://localhost:8000/board/update/${id}`, {
            title: modifyPost.title,
            content: modifyPost.content,
            id: id
        }).then(() => {
            alert('수정 완료!');
            return window.location.replace('/');
        }).catch(err => console.log(err));

    }
    useEffect(() => {
        let abortController = new AbortController()
        axios
            .get(`http://localhost:8000/board/post/${id}`)
            .then(function (result) {
                setPost(result.data);
            })
            .catch(err => console.log(err));
        return () => {
            abortController.abort()
        }
    }, []);

    const UpdateOnChange = (e) => {
        setModifyPost({
            ...modifyPost,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <div className="write-box">
                <h4>수정</h4>
                {post && post.length > 0 ?
                    post.map(function (post, key) {
                        return (
                            <form key={key} encType="multipart/form-data" className="write-form">
                                <div className="write-info">
                                    <div className="info-title">
                                        <label>제목</label>
                                    </div>
                                    <div className="info-input">
                                        <input type="text" name="title" placeholder="제목" onChange={UpdateOnChange} defaultValue={post.title}></input>
                                    </div>
                                </div>
                                <div className="write-info">
                                    <div className="info-title">
                                        <label>내용</label>
                                    </div>
                                    <div className="info-textarea">
                                        <textarea placeholder="내용" name="content" onChange={UpdateOnChange} defaultValue={post.content}></textarea>
                                    </div>
                                </div>
                                <div className="write-info-submit">
                                    <button className="submit-button" onClick={postUpdate}>수정하기</button>
                                </div>
                            </form>
                        )
                    })
                    : <></>}
            </div>
        </div>
    );
}
export default Update;