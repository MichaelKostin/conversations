'use strict';

const Error = ({errorMessage}) => (
    <div className="error">
        <h3>Error</h3>
        <p>{errorMessage}</p>
    </div>
);