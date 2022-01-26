import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/list.css';

function List() {

    const [searchTerm, setSearchTerm] = useState('');

    // const [post, setPost] = useState(null);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(9);

    const indexOfLast = currentPage * postPerPage;
    const indexOfFirst = indexOfLast - postPerPage;
    const totalPosts = post.length;
    const paginate = setCurrentPage;
    const [search, setSearch] = useState('');
    const handlerSearch = (e) => {
        setSearchTerm(e.currentTarget.value);

    }
    const submitSearch = (e) => {
        e.preventDefault();
        console.log(searchTerm)

    }
    // console.log(totalPosts)
    function currentPost(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
    const pageNumber = [];
    const Pagination = () => {
        for (let i = 1; i < Math.ceil(totalPosts / postPerPage); i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        let abortController = new AbortController()
        setLoading(true);
        axios.get('http://localhost:8000/board/list')
            .then((response) => {
                setPost(response.data)
            })
            .catch(err => console.log(err));
        setLoading(false);
        return () => {
            abortController.abort()
        }
    }, [])




    return (
        <div className="list-area">
            <div className="list-div" >
                <h4>목록</h4>
                <form className='header-center'>
                    <FontAwesomeIcon icon={faSearch} />
                    <input type='text' maxLength='20' placeholder='검색' onChange={handlerSearch} />
                    <button type='submit' value='검색' onClick={submitSearch}>검색</button>
                    {post && post.length > 0 ?
                        post.filter((board) => {
                            if (searchTerm == "") {
                                return board
                            } else if (board.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return board
                            }
                        }).map((board, key) => {
                            const view_url = '/post/' + board.id;
                            return (
                                <div key={key}>
                                    {searchTerm ?
                                        <Link to={view_url}><div>{board.title}</div></Link>
                                        : <></>}

                                </div>)
                        }) : <></>}
                </form>

                {post && post.length > 0 ?
                    post.map((board, id) => {
                        const view_url = '/post/' + board.id;
                        return (
                            <div className="list-view" key={id}>
                                <div><Link to={view_url}><img src={board.image} style={{ 'width': '100px', 'height': '100px', 'objectFit': 'cover' }}></img></Link></div>
                                <div className="list-title"><Link to={view_url}>{board.title}</Link></div>
                                <div className="list-content">{board.content}</div>
                            </div>
                        )
                    })


                    :
                    <div>데이터가 없습니다.</div>
                }

                {pageNumber.map((number) => {
                    <div key={number}>
                        <div onClick={() => paginate(number)}>s{number}</div>
                    </div>
                })}
            </div>
        </div>

    );
}
export default List;