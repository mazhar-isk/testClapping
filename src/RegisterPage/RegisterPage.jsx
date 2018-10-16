import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                fullName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.fullName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        document.body.style.backgroundColor = "#2D3238";
        return (
            <div className="col-md-6 col-md-offset-3">
            <center>
                
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.fullName ? ' has-error' : '')}>
                        <input type="text" placeholder="Fullname" className="form-control" name="fullName" value={user.fullName} onChange={this.handleChange} />
                        {submitted && !user.fullName &&
                            <label className="help-block" style={{color: '#EA4C89', display:'block',}}>Full Name is required</label>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <input type="email" placeholder="Email" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <label className="help-block" style={{color: '#EA4C89', display:'block',}}>Username is required</label>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <input type="password" placeholder="Password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <label className="help-block" style={{color: '#EA4C89', display:'block',}}>Password is required</label>
                        }
                    </div><br />
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="REGISTER" style={{background: '#EA4C89'}} />
                        <br />
                        <p>Already registered! <Link to="/login" className="btn btn-link">Login Me.</Link></p>
                    </div>
                </form>
            </center>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };