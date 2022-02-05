import axios from "axios";
import { useEffect, useState } from "react";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/category.css';
import { Link, useParams } from "react-router-dom";
import categoryPostList from "./categoryPostList";
function Category(props) {

    const [category, setCategory] = useState('');
    const [modifyName, setModifyName] = useState('');
    const [PostCate, setPostCate] = useState('');
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
        let cateName = window.prompt('추가할 카테고리의 이름을 입력해주세요.');
        cateName = cateName.trim();
        console.log(category.cateName)

        if (cateName !== '' && cateName.length > 0) {

            axios.post('http://localhost:8000/category/add', {
                cateName: cateName
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
            if (cate.cateName === modifyName) {
                return alert('변경하려는 카테고리의 이름이 이미 있습니다.')
            }
            if (window.confirm(cate.cateName + '의 이름을 ' + modifyName + ' 으로 수정하시겠습니까?')) {
                axios.post(`http://localhost:8000/category/modify/${cateId}`, {
                    cateName: modifyName,
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
        window.confirm(`선택하신 카테고리가 ${cate.cateName}이 맞습니까?`);

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
        const cateeffect = () => {
            axios.get('http://localhost:8000/category')
                .then((response) => {
                    setCategory(response.data)
                })
                .catch(err => console.log(err));
            setLoading(true);
        }

        cateeffect();

    }, [])

    return (

        <div className="cate-area">
            {loading === true ?
                <div className="cate-div">
                    <h3 className="cate-h3">카테고리</h3>
                    {login ? !edit ?
                        <input className="input-btn" type="button" value="edit" onClick={EditClick}></input>
                        : <input className="input-btn" type="button" value="add" onClick={add_category}></input>
                        : <></>

                    }
                    <a href="/" className="cate-all">전체 게시물</a>
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
                                                defaultValue={cate.cateName}
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

                                            <a href={`/cate/${cate.cateName}`}>{cate.cateName}</a>
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