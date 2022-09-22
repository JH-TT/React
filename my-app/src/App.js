import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
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

function Delete() {
    if(cache.length == 0) {
        Res.render(
            <div>
                <a>캐시가 비어있습니다.</a>
            </div>
        );
    } else {
        let key = cache.shift();
        Res.render(
            <div>
                <a>{key} 삭제</a>
            </div>
        )
        Read();
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

function CrawlingNaver() {
    const value = document.getElementById('crawling-data');
    if(value == null) {
        axios.get("/test/getRecentContent")
        .then((res) => {
            console.log(res);
            const element = (
                <div>
                    {JSON.stringify(res.data)}
                </div>
            );
            crawl.render(element);
        })
    } else {
        const element = (
            <div></div>
        )
        crawl.render(element);
    }
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

function Update() {
    const value = document.getElementById("answer").value;
    console.log(value);
    let url = "/test/1/setAnswerContent"
    if(value.length > 0){
        let data = { "answer_content" : value }
        axios.post(url, JSON.stringify(data),{
            headers: {
                "Content-Type" : `application/json`,
            },
        }).then((res) => {
            console.log("업데이트 성공!");
        }).catch(e => {
            console.error(e);
        })
    }
}

function App() {
    return (
        <div className="App">
            <button className="btn" onClick={create}>Create</button>
            <button className="btn" onClick={Read}>Read</button>
            <button className="btn" onClick={Update}>Update</button>
            <button className="btn" onClick={Delete}>Delete</button>
            <button onClick={CrawlingNaver}>크롤링</button>
        </div>
    );
}

export default App;