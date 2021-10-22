import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import StepContext from './store/step-context';
import './index.css';
import App from './App';

ReactDOM.render(
    <AuthContextProvider>
        <BrowserRouter>
            <StepContext>
                <App />
            </StepContext>
        </BrowserRouter>
    </AuthContextProvider>,
    document.getElementById('root')
)