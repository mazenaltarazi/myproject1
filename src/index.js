import React from 'react';
import { Provider } from 'react-redux'; // Import Provider
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App'; // Your main application component
import store from '../src/redux/store';

const root = createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <Provider store={store}> 
    <App />
  </Provider>
);
