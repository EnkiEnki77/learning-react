import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyApp from './thinking-in-react/thinkingInReact';
import Toolbar from './adding-interactivity/respondingToEvents';
import QueueMultiple from './adding-interactivity/queueingASeriesOfStateUpdates';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <MyApp /> */}
    {/* <Toolbar/> */}
    <QueueMultiple/>
  </React.StrictMode>
);
