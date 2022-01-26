import { useEffect, useState } from "react";
import axios from "axios";
import './css/write.css';
function Write() {
    const [board, setBoard] = useState({
        title: '',
        content: '',

    })
    const [category, setCategory] = useState('');
    const loginUser = sessionStorage.userId;
    const [fileName, setFileName] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    // const [imageName, setImageName] = useState('');
    // const [image, setImage] = useState('');

    const [imgBase64, setImgBase64] = useState('');// 파일 base64
    const [previewImg, setPreviewImg] = useState(null);	//파일	

    const [selected, setSelected] = useState(false)

    let formData = new FormData();
    const ImageHandler = (e) => {
        const image = e.target.files[0];
        //const imageName = e.target.value;
        const filename = e.target.value;
        console.log(filename)
        formData.append('image', image, filename)
        console.log(image);
        console.log(image.name)
        // var reader = new FileReader();
        // reader.readAsDataURL(image);
        // reader.onload = (function (e) {
        //     setImgSrc(e.target.result);
        // })

    }

    const onSubmitFormdata = (e) => {
        e.preventDefault();
        formData.append("title", board.title)
        formData.append("content", board.content)
        formData.append("user", loginUser)

        console.log(board.title)
        console.log(board.content)
        console.log(loginUser)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('http://localhost:8000/board/write', formData, config)
            .then((res) => {
                console.log(res);
                alert('완료');
                return window.location.replace('/');
            }).catch(err => console.log(err));
    }

    // const submitReview = (e) => {
    //     if (board.title.trim() === '') {
    //         alert('제목을 입력해주세요');
    //     }
    //     if (board.content.trim() === '') {
    //         alert('내용을 입력해주세요');
    //     }
    //     if (board.image.trim() === '') {
    //         alert('이미지를 선택해주세요');
    //     }
    //     axios.post('http://localhost:8000/board/write')
    //         .then(() => {
    //             alert('등록 완료!');
    //             return window.location.replace('/');
    //         }).catch(err => console.log(err));
    // };
    const handlerCategory = (e) => {
        setCategory(e.target.value)
        setSelected(true);
        console.log(category)
    }

    // useEffect(() => {
    //     axios.get('http://localhost:8000/category')
    //         .then((response) => {
    //             setCategory(response.data)
    //         })
    //         .catch(err => console.log(err));
    // }, [])

    const getValue = e => {
        const { name, value } = e.target;
        setBoard({
            ...board,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div>
            <div className="write-box">
                <h4>글쓰기</h4>
                <form encType="multipart/form-data" className="write-form">
                    <div className="write-info">
                        <div className="info-category">
                            <label>카테고리</label>
                        </div>
                        {/* <div className="info-input">

                            <select className="select-category">
                                {category && category.length > 0 ?
                                    category.map((cate, key) => {
                                        return (
                                            <option key={key} value={cate.value} name="cate_name" onClick={handlerCategory}>
                                                {cate.cate_name}
                                            </option>

                                        )
                                    })
                                    :
                                    <div>데이터가 없습니다.</div>
                                }

                            </select>

                        </div> */}
                    </div>
                    <div className="write-info">
                        <div className="info-title">
                            <label>제목</label>
                        </div>
                        <div className="info-input">
                            <input type="text" name="title" placeholder="제목" onChange={getValue}></input>
                        </div>
                    </div>
                    <div className="write-info">
                        <div className="info-title">
                            <label>내용</label>
                        </div>
                        <div className="info-textarea">
                            <textarea placeholder="내용" name="content" onChange={getValue}></textarea>
                        </div>
                    </div>
                    <div className="write-info">
                        <div className="info-image">
                            <label>이미지</label>
                        </div>
                        <div className="info-input">
                            <input type="file" className="imgInput"
                                accept="image/*"
                                name="imgFile"
                                id='imgFile'
                                onChange={ImageHandler}></input>
                        </div>
                        {/* <div style={{ "backgroundColor": "#efefef", "width": "150px", "height": "150px" }} onChange={ImageHandler}></div>
                        <div> */}
                        <img name='image' style={{ 'width': '250px', 'height': '250px' }}></img>

                    </div>
                    <div className="write-info-submit">
                        <button className="submit-button" onClick={onSubmitFormdata}>등록</button>
                    </div>
                </form>
            </div >
        </div >
    );

}

export default Write;