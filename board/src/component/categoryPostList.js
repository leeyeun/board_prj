import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Category from "./category";
import './css/category.css';
function CategoryPostList() {
    const [catePost, setcatePost] = useState('');
    const { cateName } = useParams();
    const [cateCnt, setCateCnt] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/cate/${cateName}`)
            .then((response) => {
                setcatePost(response.data)
            })
            .catch(err => console.log(err));

        axios.get(`http://localhost:8000/cate/cateCnt/${cateName}`)
            .then((response) => {
                setCateCnt(response.data)
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="cate-area-list">

            <div className='body-cate'>
                <Category className='categoryCompo' />
                <div className="body-cate-list">
                    <h3 className="list-title-title">{cateName} 게시판</h3>
                    {cateCnt && cateCnt.length > 0 ?
                        cateCnt.map(function (cateCnt, key) {
                            return (
                                <div key={key}>
                                    <div className="cnt">{cateCnt.cateCnt} 개의 글</div>
                                </div>
                            )
                        }) : <></>}

                    <div className="list-area">
                        {catePost && catePost.length > 0 ?
                            catePost.map((catePost, key) => {
                                const view_url = '/post/' + catePost.id;

                                return (

                                    <div className="list-box" key={key}>
                                        <div className="list-img"><Link to={view_url}><img src={catePost.image} style={{ 'width': '200px', 'height': '200px', 'objectFit': 'cover' }}></img></Link></div>
                                        <div className="list-title"><Link to={view_url}>{catePost.title}</Link></div>
                                        <div className="list-user">{catePost.username}</div>
                                        <div className="list-viewcnt">조회수 {catePost.view_cnt}</div>
                                        <div className="list-datetime">{catePost.datetime}</div>
                                    </div>

                                )
                            }) : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CategoryPostList;