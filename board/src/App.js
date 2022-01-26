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


function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    let abortController = new AbortController()
    if (sessionStorage.getItem('userId') === null) {
      console.log('login ?? :: ', login)
    }
    else {
      setLogin(true)
      console.log('login ?? :: ', login)
    }
    return () => {
      abortController.abort()
    }
  })
  return (
    <div>
      <BrowserRouter>
        <Header login={login} />
        <Routes>
          <Route path="/" element={<Main login={login} />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/post" element={<View />} />
          <Route path="/post/:id" element={<View login={login} />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypageComment" element={<MypageComment />} />
          <Route path="/mypagePost" element={<MypagePost />} />
          <Route path="/comment/modify" element={<ModifyComment />} />
        </Routes>

      </BrowserRouter>

    </div>

  );
}


export default App;
