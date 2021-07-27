import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './services/store';
import axios from 'axios';

axios.interceptors.request.use(request=>{
  let token = localStorage.getItem('jwt');
  if(token){
    request.headers['Authorization'] = 'Bearer '+token;
    
  }
  return request;
})

// axios.interceptors.request.use(async config => {
//   const value = await redisClient.get(rediskey)
//   const keys = JSON.parse(value)
//   config.headers = { 
//     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
//     'Accept': 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
//   return config;
// },
// error => {
//   Promise.reject(error)
// })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
