import React from 'react';
import ReactDOM from 'react-dom';
import { Search } from './Search';
import ErrorBoundary from 'react-error-boundary';

import './styles.css';

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
