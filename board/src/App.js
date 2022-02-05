import './App.css';
import Header from './component/header';
import Main from './component/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Write from './component/write';
import Login from './component/login';
import Join from './component/join';
import View from './component/view';
import Update from './component/update';
import { useEffect, useState } from 'react';
import Mypage from './component/mypage/mypage';
import ModifyComment from './component/ModifyComment';
import MypageComment from './component/mypage/mypage_comment';
import MypagePost from './component/mypage/mypagePost';
import CategoryPostList from './component/categoryPostList';


function App() {
  const [login, setLogin] = useState(false);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('userId') === null) {
      console.log('login ?? :: ', login)
    }
    else {
      setLogin(true)
      console.log('login ?? :: ', login)
    }

    if (localStorage.getItem('like') === null) {
      console.log('like ?? ', heart)
    } else {
      setHeart(true)
      console.log('like ?? ', heart)
    }

  }, [])
  return (
    <div className='app-div'>
      <BrowserRouter>
        <Header login={login} />
        <Routes>
          <Route path="/" element={<Main login={login} heart={heart} />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/post" element={<View />} />
          <Route path="/post/:id" element={<View login={login} heart={heart} />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypageComment" element={<MypageComment />} />
          <Route path="/mypagePost" element={<MypagePost />} />
          <Route path="/comment/modify" element={<ModifyComment />} />
          <Route path="/cate/:cateName" element={<CategoryPostList />} />
        </Routes>

      </BrowserRouter>

    </div>

  );
}


export default App;
