'use strict';

import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import { removeError } from '../actions';

const mapStateToProps = (state) => ({
    errors: state.app.errors,
});
const mapDispatchToProps = (dispatch) => ({
    removeError: (message) => dispatch(removeError(message)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
