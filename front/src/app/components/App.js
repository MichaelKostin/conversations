'use strict';

import React from 'react';
import { Component, PropTypes } from 'react';

const Header = ()=> (
    <header>
        <h2 id="header"><a href="/#/" title="Home page">Chat</a></h2>
    </header>
);

const Error = ({errorMessage, removeError}) => {
    setTimeout(() => {
        removeError(errorMessage);
    }, 3000);

    return (
        <div className="error">
            <h3>Error</h3>
            <p>{errorMessage}</p>
        </div>
    );
};

const App = ({ children, errors, removeError })=> (
      <div>
        <Header/>
        <div className="content">
          { children }
        </div>
        <footer>
            {errors.map((error)=> (
                <Error key={error} removeError={removeError} errorMessage={error} />
            ))}
        </footer>
      </div>
);

App.PropTypes =  {
    children: PropTypes.node.isRequired,
    errors: PropTypes.array.isRequired
};

export default App;
