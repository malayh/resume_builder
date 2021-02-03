import React from 'react';
import ReactDOM from 'react-dom';

import LoginPage from './login/Login';
import ResumeBuilder from './ResumeBuilder';

ReactDOM.render(
    <React.StrictMode>
        <ResumeBuilder/>
    </React.StrictMode>,
    document.getElementById('root')
);
  