import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useParams } from "react-router-dom";

function ModifyComment({ modalOpen }) {

    const { comId } = useParams();
    const [comment, setComment] = useState('');
    // const [modalOpen, setModalOpen] = useState(false);

    const openModal = (com) => {
        // setModalOpen(!modalOpen)
        console.log('open modal!')
        console.log(comId)

    }
    const closeModal = () => {
        // setModalOpen(false)
    }

    useEffect(() => {
        let abortController = new AbortController()
        axios.get('http://localhost:8000/comment/modify')
            .then(function (result) {
                setComment(result.data);
            })
            .catch(err => console.log(err));
        return () => {
            abortController.abort()
        }
    }, []);

    return (
        <div>
            <Modal isOpen={openModal} closeModal={closeModal} appElement={document.getElementById('root')}>
                <div >x</div>
                <div>{comment.comId}</div>
                <div>{comment.comment}</div>
            </Modal>
        </div>


    );
}
export default ModifyComment;