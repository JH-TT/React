import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
const res = ReactDOM.createRoot(document.getElementById('Name'));


root.render(
  <React.StrictMode>
    <Input />
    <AnswerInput />
    <App />
    <button onClick={showName}>Show Sara</button>
    <button onClick={deleteresult}>delete</button>
  </React.StrictMode>
);
function Input() {
  return (
      <div className="Input">
          <input type="text" id="searchUrl"></input>
      </div>
  )
}

function AnswerInput() {
    return (
        <div>
            댓글 : <input type="text" id="answer" name="answer_content"></input>
        </div>
    );
}

function deleteresult() {
    const element = (
        <div>
        </div>
    );
    res.render(element);
}

function showName() {
    let getRes = document.getElementById('name');
    console.log(getRes);
    if(getRes == null) {
        const element = (
            <div>
                <a id="name">Sara</a>
            </div>
        );
        res.render(element);
    } else {
        deleteresult();
    }

}

reportWebVitals();