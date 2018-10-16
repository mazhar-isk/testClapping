import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        document.body.style.backgroundColor = "#25AE90";
        return (
            <div className="col-md-6 col-md-offset-3">
            <center>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <input type="email" placeholder="Email" style={{background: '#fff',color:'#000'}} className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <label className="help-block" style={{color: 'red', display:'block',}}>Username is required</label>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" placeholder="Password" style={{background: '#fff',color:'#000'}} className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <label className="help-block" style={{color: 'red', display:'block',}}>Password is required</label>
                        }
                    </div><br />
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Login" style={{background: '#EDEEF2', color:'#30B396'}} />
                        <br />
                        <p>Not a member? <Link to="/register" className="btn btn-link">Sign up now.</Link></p>
                    </div>
                </form>
            </center>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 