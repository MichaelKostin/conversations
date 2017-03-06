'use strict';

import React, { PropTypes } from 'react';

const NicknameForm = ({submitNickname})=> {
    let input ;
    const submit = (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            submitNickname(input.value);
        }
    };
    return (
        <div className=" window nickname-form">
            <h3>Enter your nickname</h3>
            <form onSubmit={submit}>
                <input
                    ref={(ref)=> input = ref }
                    type="text"
                    id="nickname"
                />
                <button type="submit">Ok</button>
            </form>
        </div>
    )
};

NicknameForm.propTypes = {
    submitNickname: PropTypes.func
};

export default NicknameForm;
