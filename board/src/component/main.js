import React from "react";
import Category from "./category";
import List from "./list";
import './css/main.css';

function Main(props) {
    const login = props.login;
    return (
        <div className="main-div">
            <Category className="category" login={login} />
            <List className="list" />
        </div>
    );
}


export default Main;