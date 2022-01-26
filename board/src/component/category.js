import axios from "axios";
import { useEffect, useState } from "react";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/category.css';
import { useParams } from "react-router-dom";
function Category(props) {

    const [category, setCategory] = useState('');
    const [modifyName, setModifyName] = useState('');
    const [edit, setEdit] = useState(false);
    // const [cate_name, setCate_Name] = useState('');
    const login = props.login;
    const [loading, setLoading] = useState(false);

    const { cateId } = useParams();

    const handlerModify = (e) => {
        setModifyName(e.currentTarget.value);
    }
    const EditClick = () => {
        setEdit(!edit);
    }

    const add_category = async function () {
        let cate_name = window.prompt('추가할 카테고리의 이름을 입력해주세요.');
        cate_name = cate_name.trim();
        console.log(category.cate_name)

        if (cate_name !== '' && cate_name.length > 0) {

            axios.post('http://localhost:8000/category/add', {
                cate_name: cate_name
            }).then(() => {
                alert('등록 완료!');
                return window.location.replace('/');
            }).catch(err => console.log(err));

        } else {
            return alert('최소 1글자 이상 입력해야 합니다.');
        }
    }
    const modifyCategory = (cate) => {
        console.log(cate.cateId);
        if (modifyName !== '' && modifyName.length > 0) {
            if (cate.cate_name === modifyName) {
                return alert('변경하려는 카테고리의 이름이 이미 있습니다.')
            }
            if (window.confirm(cate.cate_name + '의 이름을 ' + modifyName + ' 으로 수정하시겠습니까?')) {
                axios.post(`http://localhost:8000/category/modify/${cateId}`, {
                    cate_name: modifyName,
                    cateId: cate.cateId
                }).then(() => {
                    alert('수정 완료!');
                    return window.location.replace('/');
                }).catch(err => console.log(err));
            } else {
                alert('취소되었습니다.');
            }

        }


    }

    const deleteCategory = async (cate) => {
        window.confirm(`선택하신 카테고리가 ${cate.cate_name}이 맞습니까?`);

        if (window.confirm(' 정말 삭제하시겠습니까?')) {
            axios.post(`http://localhost:8000/category/${cate.cateId}`, {
                cateId: cate.cateId
            })
                .then(() => {
                    alert('카테고리가 삭제되었습니다.');
                    return window.location.replace('/');
                })
                .catch(err => console.log(err))
                .then(function () {
                    // always executed
                });
        }
        else {
            alert('취소되었습니다.');
        }
    }
    useEffect(() => {
        axios.get('http://localhost:8000/category')
            .then((response) => {
                setCategory(response.data)
            })
            .catch(err => console.log(err));
        setLoading(true);
    }, [])

    return (

        <div className="cate-area">
            {loading === true ?
                <div className="cate-div">
                    <h4>카테고리</h4>
                    {login ? !edit ?
                        <input type="button" value="edit" onClick={EditClick}></input>
                        : <input type="button" value="add" onClick={add_category}></input>
                        : <></>

                    }
                    {category && category.length > 0 ?
                        category.map((cate, key) => {
                            if (edit) {
                                return (
                                    <div className="category" key={key}>
                                        {login === true ?
                                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteCategory(cate)} />
                                            : <></>}
                                        <div className="cate-name">
                                            <input type='text'
                                                name="modify_name"
                                                maxLength="15"
                                                className="modify-input"
                                                defaultValue={cate.cate_name}
                                                onChange={handlerModify}>
                                            </input>
                                            <FontAwesomeIcon icon={faCheck} onClick={() => modifyCategory(cate)} />
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="category" key={key}>
                                        <div className="cate-name">
                                            {cate.cate_name}
                                        </div>
                                    </div>
                                )
                            }
                        })
                        :
                        <div>데이터가 없습니다.</div>
                    }
                </div> : <></>}

        </div>

    );
}
export default Category;