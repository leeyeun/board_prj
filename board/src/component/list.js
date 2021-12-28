import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List() {

    const [viewContent, setViewContent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/board/get')
            .then((response) => {
                setViewContent(response.data)
            })
            .catch(err => console.log(err));
    }, [viewContent])


    return (

        <div className="list-view" >
            {viewContent && viewContent.length > 0 ?
                viewContent.map((board, id) => {
                    const view_url = '/view/' + board.id;
                    return (
                        <div key={board, id}>
                            <h3><Link to={view_url}>{board.title}</Link></h3>
                            <div>
                                {board.content}
                            </div>
                        </div>
                    )

                })

                :
                <div>데이터가 없습니다.</div>
            }
            {/* {viewContent.map((board, id) =>

                <div key={board, id}>
                    <h3><Link to="/view/:id">{board.title}</Link></h3>
                    <div>
                        {board.content}
                    </div>
                </div>
            )} */}
            {/* <div className="list-info">
                <div className="info-title">
                    <label><Link to="/view">제목</Link></label>
                </div>
            </div>
            <div className="list-info">
                <div className="info-title">
                    <label>내용</label>
                </div>
            </div>
            <div className="list-info">
                <div className="info-title">
                    <label>이미지</label>
                </div>
            </div> */}
        </div>
    );
}
export default List;