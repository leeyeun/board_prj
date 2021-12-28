import React from "react";
import { Link } from "react-router-dom";
import List from "./list";

function Main() {
    return (
        <div className="main-div">
            <Link to="/write" >글쓰기</Link>
            <List />
        </div>
    );
}


export default Main;