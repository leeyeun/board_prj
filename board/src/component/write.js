import { useEffect, useState } from "react";
import axios from "axios";
import './css/write.css';
function Write() {
    const [board, setBoard] = useState({
        title: '',
        content: '',

    })
    const [category, setCategory] = useState('');
    const [selectCate, setSelectCate] = useState('');
    const loginUser = sessionStorage.userId;
    const [imgSrc, setImgSrc] = useState('');
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    // const [imageName, setImageName] = useState('');
    const [selected, setSelected] = useState(false);
    const [image, setImage] = useState('');

    const getValue = e => {
        //const { name, value } = e.target;
        setBoard({
            ...board,
            [e.target.name]: e.target.value
        })
    };
    let formData = new FormData();
    const ImageHandler = (e) => {
        //const image = e.target.files[0];
        setImage(e.target.files[0]);

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
    const handlerCategory = (e) => {
        setSelectCate(e.target.value);
        console.log(selectCate);
        console.log('category : ', e.target.value)
    }
    const onSubmitFormdata = (e) => {
        e.preventDefault();
        formData.append("title", board.title)
        formData.append("content", board.content)
        formData.append("userName", loginUser)
        formData.append('image', image)
        formData.append("cateName", selectCate);

        console.log(board.title)
        console.log(board.content)
        console.log(loginUser)
        console.log(image);
        console.log(selectCate);
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

    useEffect(() => {
        axios.get('http://localhost:8000/category')
            .then((response) => {
                setCategory(response.data)
            })
            .catch(err => console.log(err));
    }, [])



    return (
        <div>
            <div className="write-box">
                <h4>글쓰기</h4>
                <form encType="multipart/form-data" className="write-form">
                    <div className="write-info">
                        <div className="info-category">
                            <label>카테고리</label>
                        </div>
                        <div className="info-input">
                            <span>
                                <select className="select-category" onChange={handlerCategory}>
                                    {category && category.length > 0 ?
                                        category.map((cate, key) => {
                                            return (
                                                <option className="cateName" key={key} value={cate.value} name="cateName" >
                                                    {cate.cateName}
                                                </option>
                                            )
                                        })
                                        :
                                        <></>
                                    }
                                </select>
                            </span>
                        </div>
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
                        <div className="info-title">
                            <label>이미지</label>
                        </div>
                        <div className="info-image-div">
                            <div className="info-input">
                                <input type="file" className="imgInput"
                                    accept="image/*"
                                    name="image"
                                    id='image'
                                    onChange={ImageHandler}></input>
                            </div>
                            <div className="info-imgPreview">
                                {imgSrc && <img src={imgSrc} className="imgPreview" name='img' style={{ 'width': '250px', 'height': '250px' }}></img>}
                            </div>
                        </div>


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