'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { addNickname } from '../actions';
import ActiveUsers from '../components/Home/ActiveUsers';
import NicknameForm from '../components/Home/NicknameForm';
import UserIco from '../components/Home/UserIco';

const mapStateToProps = (state) => ({
    nickname: state.app.nickname,
    activeUsers: state.app.activeUsers
});

const mapDispatchToProps = (dispatch) => ({
    submitNickname: (nickname) => dispatch(addNickname(nickname)),
});

const HomeContainer = ({nickname, activeUsers, submitNickname})=> {
    return (
        <div>
            {
                nickname ? (
                    <div>
                        <UserIco nickname={nickname} />
                        <ActiveUsers users={activeUsers}/>
                    </div>
                ) : (
                    <NicknameForm submitNickname={submitNickname} />
                )
            }
        </div>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);
