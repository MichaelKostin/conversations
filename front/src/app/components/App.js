'use strict';

import React from 'react';
import { Component, PropTypes } from 'react';

const Header = ()=> (
    <header>
        <h2 id="header"><a href="/#/" title="Home page">Chat</a></h2>
    </header>
);

const App = ({ children, errors })=> (
      <div>
        <Header/>
        <div className="content">
          { children }
        </div>
        <footer>
        </footer>
      </div>
);

App.PropTypes =  {
  children: PropTypes.node.isRequired
};

export default App;
