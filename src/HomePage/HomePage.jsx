import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        document.body.style.backgroundColor = "#323234";
        return (
        <center>
            <div className="col-md-6 col-md-offset-3">
                
                <p>Selamat datang <b><i>{user.username}</i></b></p>
                
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        </center>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };