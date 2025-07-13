import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // ✅ Use the correct path to your store
import { ColorModeProvider } from "./components/ui/ThemeContext";


// Set theme based on preference/localStorage
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark);

document.documentElement.setAttribute("data-theme", defaultDark ? "dark" : "light");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <ColorModeProvider>
      <App />
    </ColorModeProvider>
    </Provider>
  </React.StrictMode>
);
