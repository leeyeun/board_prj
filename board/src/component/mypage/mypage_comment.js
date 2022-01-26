import axios from "axios";
import { useEffect, useState } from "react";

function MypageComment() {
    const [comment, setComment] = useState([]);
    const [clickComment, setClickComment] = useState(false);

    const onClickComment = () => {
        setClickComment(!clickComment);
        console.log(clickComment)
    }

    useEffect(() => {
        axios.get('http://localhost:8000/comment')
            .then((response) => {
                setComment(response.data)
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <div>
            <h4>댓글</h4>
            {clickComment === true ?
                <div>
                    {comment && comment.length > 0 ?
                        comment.map((comment, key) => {
                            return (
                                <div key={key}>
                                    <div>{comment.comment}</div>
                                </div>
                            )
                        })
                        : <div>댓글이 없다.</div>}
                </div>
                : <></>
            }
        </div>
    )
}
export default MypageComment;