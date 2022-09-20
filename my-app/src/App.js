import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import axios from 'axios';

const Res = ReactDOM.createRoot(document.getElementById('result'));
const read = ReactDOM.createRoot(document.getElementById('reading'));
const crawl = ReactDOM.createRoot(document.getElementById('crawling'));
const cache = [];

function create() {
    let url = document.getElementById('searchUrl').value;
    console.log(url);
    if(url.length == 0) {
        showError();
    } else {
        if(cache.indexOf(url) == -1) {
            cache.push(url);
        }
        showResult(url);
        console.log(cache);
    }
}

function Read() {
    let values = ``
    if(cache.length == 0) {
        read.render((
            <div>
                <a>저장된 데이터가 없습니다.</a>
            </div>
        ));
    } else {
        cache.forEach(element => {
            values = values + `${element} `;
        });
        const element = (
            <div>
                <a>{values}</a>
            </div>
        );
        read.render(element);
    }
}

function Crawling_Naver() {
    axios.get("")
    .then((res) => {
        const element = (
            <div>
                {res.data}
            </div>
        );
        crawl.render(element);
    })
}

function showResult(url) {
    const element = (
        <div>
            <a>{url}</a>
        </div>
    )
    Res.render(element);
}

function showError() {
    const element = (
        <div>
            <a>URL을 다시 입력해 주세요.</a>
        </div>
    );
    Res.render(element);
}

function App() {
    return (
        <div className="App">
            <button className="btn" onClick={create}>Create</button>
            <button className="btn" onClick={Read}>Read</button>
            {/* <button className="btn" onClick={Update}>Update</button> */}
            {/* <button className="btn" onClick={Delete}>Delete</button> */}
            <button onClick={Crawling_Naver}>크롤링(네이버)</button>
        </div>
    );
}

export default App;