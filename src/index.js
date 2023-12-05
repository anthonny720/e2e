import React from 'react';
import ReactDOM from 'react-dom/client';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
