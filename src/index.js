import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyApp from './thinking-in-react/thinkingInReact';
import Toolbar from './adding-interactivity/respondingToEvents';
import QueueMultiple from './adding-interactivity/queueingASeriesOfStateUpdates';
import Form from './managing-state/reactingToInputWithState';
import FormApp from './managing-state/reactingToInputWithState';
import Accordion from './managing-state/sharingStateBetweenComponents';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <MyApp /> */}
    {/* <Toolbar/> */}
    {/* <QueueMultiple/> */}
    {/* <Form/> */}
    {/* <FormApp/> */}
    <Accordion/>
  </React.StrictMode>
);
