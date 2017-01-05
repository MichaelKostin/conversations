'use strict';

import React from 'react';
import UserName from './NicknameForm';

const Home = ()=> (
    <aside className="text-chat">
        <header>
            <h2>Conversation</h2>
            <div className="close"></div>
        </header>

        <div className="content">
            <p className="right-align">hello</p>
            <p className="left-align">hey, username!</p>
            <p className="left-align">How are you? <br />Did you read my message? </p>
            <p className="right-align">hello</p>
            <p className="left-align">hey, username!</p>

        </div>
        <div className="area">
            <textarea autoFocus="autofocus" placeholder="Type your text here..." ></textarea>
            <button>Send</button>
        </div>

    </aside>
);

export default Home;