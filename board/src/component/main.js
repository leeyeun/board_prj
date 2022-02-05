import React from "react";
import Category from "./category";
import List from "./list";
import './css/main.css';

function Main(props) {
    const login = props.login;
    return (
        <div className="main-area">
            <div className="content-area">
                <Category className="category" login={login} />
                <List className="list" />
            </div>

        </div>
    );
}


export default Main;