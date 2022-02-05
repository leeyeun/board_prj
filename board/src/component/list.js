import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/list.css';
import Posts from "./post";
import Pagination from "./pagination";

function List() {

    const [cateCnt, setCateCnt] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // const [post, setPost] = useState(null);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(12);

    //const totalPosts = post.length;
    //const paginate = setCurrentPage;
    const [search, setSearch] = useState('');
    const handlerSearch = (e) => {
        setSearchTerm(e.currentTarget.value);

    }
    const submitSearch = (e) => {
        e.preventDefault();
        console.log(searchTerm)
    }
    // console.log(totalPosts)
    // function currentPost(tmp) {
    //     let currentPosts = 0;
    //     currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    //     return currentPosts;
    // }
    // const pageNumber = [];
    // const Pagination = () => {
    //     for (let i = 1; i < Math.ceil(totalPosts / postPerPage); i++) {
    //         pageNumber.push(i);
    //     }
    // }

    useEffect(() => {

        setLoading(true);
        axios.get('http://localhost:8000/board/list')
            .then((response) => {
                setPost(response.data)
            })
            .catch(err => console.log(err));
        setLoading(false);

        axios.get('http://localhost:8000/board/cnt')
            .then((response) => {
                setCateCnt(response.data)
            })
            .catch(err => console.log(err));
    }, [])

    const indexOfLast = currentPage * postPerPage;
    const indexOfFirst = indexOfLast - postPerPage;
    const currentPosts = post.slice(indexOfFirst, indexOfLast);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className="list-area">
            <div className="list-div" >
                <h3 className="list-allList">전체 게시글</h3>
                {cateCnt && cateCnt.length > 0 ?
                    cateCnt.map(function (cateCnt, key) {
                        return (
                            <div key={key}>
                                <div className="cnt">{cateCnt.cnt} 개의 글</div>
                            </div>
                        )
                    }) : <></>}
                <Posts post={currentPosts} loading={loading} searchTerm={searchTerm} />
                <Pagination
                    postsPerPage={postPerPage}
                    totalPosts={post.length}
                    paginate={paginate} />
                <form className='header-search'>
                    <div className="header-top">
                        <FontAwesomeIcon icon={faSearch} />
                        <input className="search-input" type='text' maxLength='20' placeholder='검색' onChange={handlerSearch} />
                        <button type='submit' value='검색' onClick={submitSearch}>검색</button>
                    </div>
                    <div className="header-down">
                        {post && post.length > 0 ?
                            post.filter((board) => {
                                if (searchTerm == "") {
                                    return board
                                } else if (board.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return board
                                }
                            })
                                .map((board, key) => {
                                    const view_url = '/post/' + board.id;
                                    return (
                                        <div className="search-box" key={key}>
                                            {searchTerm ?
                                                <div className="search-list">
                                                    {/* <div className="search-image"><Link to={view_url}><img src={board.image} style={{ 'width': '100px', 'height': '100px', 'objectFit': 'cover' }}></img></Link></div> */}
                                                    <div className="list-title"><Link to={view_url}>{board.title}</Link></div>
                                                </div>
                                                : <></>}

                                        </div>
                                    )
                                }) : <></>}
                    </div>

                </form>
            </div>


        </div>

    );
}
export default List;