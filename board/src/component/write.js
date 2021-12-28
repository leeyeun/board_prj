import { useEffect, useState } from "react";
import axios from "axios";

function Write() {
    const [board, setBoard] = useState({
        title: '',
        content: ''
    });

    const submitReview = () => {
        axios.post('http://localhost:8000/board/insert', {
            title: board.title,
            content: board.content
        }).then(() => {
            alert('등록 완료!');
        }).catch(err => console.log(err));
    };

    const getValue = e => {
        const { name, value } = e.target;
        setBoard({
            ...board,
            [name]: value
        })
    };

    return (
        <div>
            <div className="write-box">
                <h4>글쓰기</h4>
                <form encType="multipart/form-data" className="write-form">
                    {/* <div className="write-info">
                        <div className="info-catagory">
                            <label>카테고리</label>
                        </div>
                        <div className="info-input">
                            <input type="text" name="catagory" placeholder="카테고리" value={catagory} onChange={onChangeCatagory}></input>
                        </div>
                    </div> */}
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
                    {/* <div className="write-info">
                        <div className="info-title">
                            <label>이미지</label>
                        </div>
                        <div className="info-input">
                            <input type="file" multiple="multiple" accept="image/*" name="file"></input>
                        </div>
                    </div> */}
                    <div className="write-info-submit">
                        <button className="submit-button" onClick={submitReview}>등록</button>
                    </div>
                </form>
            </div>

        </div>


    );
}

export default Write;