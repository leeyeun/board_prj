import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function Update() {
    const [post, setPost] = useState('')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [modifyPost, setModifyPost] = useState({
        title: title,
        content: content
    });

    const { id } = useParams();
    let formData = new FormData();
    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
        // const image = e.target.files[0];
        // //const imageName = e.target.value;
        // const filename = e.target.value;
        console.log(e.target.value)
        // formData.append('image', image, filename)
        console.log(e.target.files[0]);
        console.log(e.target.files[0].name)
        Reader(e);
    }
    const Reader = e => {
        let reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            console.log(e.target.files[0])
        }
        reader.onload = () => {
            const previewImgUrl = reader.result
            if (previewImgUrl) {
                setImgSrc([...imgSrc, previewImgUrl])
            }
        };
    }
    const postUpdate = (e) => {
        e.preventDefault();

        console.log(modifyPost.title)
        console.log(modifyPost.content)
        console.log(id)

        formData.append("title", modifyPost.title);
        formData.append("content", modifyPost.content);
        formData.append("id", id);
        formData.append('image', image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(`http://localhost:8000/board/update/${id}`, formData, config)
            .then((res) => {
                console.log(res);
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
    // const UpdateOnChange = useCallback((e) => {
    //     setModifyPost(e.target.value)
    // }, [])
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
                                        <input type="text" name="title" placeholder="제목" defaultValue={post.title} onChange={UpdateOnChange} ></input>
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
                                <div className="write-info">
                                    <div className="info-title">
                                        <label>이미지</label>
                                    </div>
                                    <div className="info-image-div">
                                        <div className="info-input">
                                            <input type="file" className="imgInput"
                                                accept="image/*"
                                                name="imgFile"
                                                id='imgFile'
                                                onChange={ImageHandler}
                                                defaultValue={post.image.name}
                                            ></input>

                                        </div>
                                        <div className="info-imgPreview">
                                            {imgSrc ? <img src={imgSrc} onChange={UpdateOnChange} className="imgPreview" style={{ 'width': '250px', 'height': '250px', 'objectFit': 'cover' }}></img>
                                                : <img src={post.image} onChange={UpdateOnChange} className="imgPreview" style={{ 'width': '250px', 'height': '250px', 'objectFit': 'cover' }}></img>}
                                        </div>
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
        </div >
    );
}
export default Update;