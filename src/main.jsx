import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0Provider
          domain="dev-33mmk06chjo16nsv.us.auth0.com"
          clientId="bcGPldhd9ibAd3UG7oCDJctMeDFKDq2W"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "https://dev-33mmk06chjo16nsv.us.auth0.com/api/v2/",
            scope: "openid profile email",
          }}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
