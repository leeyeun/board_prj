import './App.css';
import Header from './component/header';
import Main from './component/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Write from './component/write';
import Login from './component/login';
import Join from './component/join';
import View from './component/view';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/view" element={<View />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
