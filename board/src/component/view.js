import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './css/view.css';
import Comment from "./comment";
function View(props) {

    const { id } = useParams();
    const [post, setPost] = useState('');

    const login = props.login;

    useEffect(function () {
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

    if (post === null) {
        return <h1>게시글을 받고 있습니다.</h1>
    }

    return (
        <div>
            <div className="view-box">
                <h4>post {id}</h4>
                <div>
                    {post && post.length > 0 ?
                        post.map(function (post, key) {
                            return (
                                <div key={key} className="view-info">
                                    <div className="view-category">
                                        <div className="view-left">카테고리</div>
                                        <div className="view-category">{post.cate_name}</div>
                                    </div>
                                    <div className="view-title">
                                        {/* <div className="view-left">제목</div> */}
                                        <div className="view-right">{post.title}</div>
                                    </div>
                                    <div className="view-writer">
                                        {/* <div className="view-left">작성자</div> */}
                                        <div className="view-user">{post.user}</div>
                                        <div className="view-datetime">{post.datetime}</div>
                                    </div>
                                    <div className="view-content">
                                        {/* <div className="view-left">내용</div> */}
                                        <div className="view-right">{post.content}</div>
                                    </div>
                                    <div className="view-img">
                                        {/* <div className="view-left">이미지</div> */}
                                        <div>
                                            <img src={post.image} className="view-right" style={{ 'width': '250px', 'height': '250px', 'objectFit': 'cover' }}></img>
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
                        <Link to={`/update/${id}`}><button>수정</button></Link>
                        <button onClick={deletePost}>삭제</button>
                    </div> : <></>}

            </div>
            <Comment login={login} />
        </div>
    );
}
export default View;