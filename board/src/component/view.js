import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function View() {


    const [viewContent, setViewContent] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/board/get/')
            .then((response) => {
                setViewContent(response.data)
            })
            .catch(err => console.log(err));
    }, [viewContent]);


    return (
        <div>
            <div className="view-box">
                <h4>view</h4>
                {viewContent ?
                    <div>
                        <div className="view-info">
                            <div className="info-input">
                                <div>{viewContent.title}</div>
                            </div>
                        </div>
                        <div className="view-info">
                            <div className="info-textarea">
                                <div>{viewContent.title}</div>
                            </div>
                        </div>
                    </div>

                    : '해당 게시글을 읽을 수 없습니다.'
                }
            </div>
        </div>
    );
}
export default View;