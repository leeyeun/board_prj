import React from "react";
import { Link } from "react-router-dom";
const Posts = ({ post, loading, searchTerm }) => {
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className="list-post">
            {post && post.length > 0 ?
                post.map((board, id) => {
                    const view_url = '/post/' + board.id;
                    return (
                        <div className="list-view" key={id}>
                            <div className="list-img"><Link to={view_url}><img src={board.image} style={{ 'width': '200px', 'height': '200px', 'objectFit': 'cover' }}></img></Link></div>
                            <div className="list-title"><Link to={view_url}>{board.title}</Link></div>
                            <div className="list-user">{board.username}</div>
                            <div className="list-viewcnt">조회수 {board.view_cnt}</div>
                            <div className="list-datetime">{board.datetime}</div>
                            {/* <div className="list-content">{board.content}</div> */}
                        </div>
                    )
                })
                :
                null
            }
        </div>

    )


};
export default Posts;