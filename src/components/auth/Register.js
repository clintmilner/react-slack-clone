/**
 * User: clint
 * Date: 08/10/2018
 * Time: 21:24
 *
 * Rebasoft - Network Intelligence
 */

import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';
import {Button, Form, Grid, Header, Icon, Message, Segment} from 'semantic-ui-react';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: [],
            loading: false,
            usersRef: firebase.database().ref('users')
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        if(this.isFormValid()) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then( createdUser => {
                    console.log('createdUser', createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                    .then(() => {
                        this.saveUser(createdUser)
                            .then(() => {
                                console.log('user saved!', createdUser);
                            })
                    })
                    .catch( err => {
                        console.error('ERROR: ', err);
                        this.setState((prevState) => ({loading: false, errors: prevState.errors.concat(err)}));
                    })
                })
                .catch( err => {
                    console.error('ERROR: ', err);
                    this.setState((prevState) => ({loading: false, errors: prevState.errors.concat(err)}));
                });
        }
    };

    isFormValid() {
        let errors = [],
            error;
        if(Register.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields' };
            this.setState({errors: errors.concat(error)});
            return false;
        } else if(!Register.isPasswordValid(this.state)) {
            error = { message: 'Password is invalid' }
            this.setState({errors: errors.concat(error)});
        } else {
            this.setState({errors: []});
            return true;
        }
    }

    static isFormEmpty({username, email, password, passwordConfirmation}){
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }

    static isPasswordValid({password, passwordConfirmation}) {
        if(password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if(password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error,idx) => {
        return <p key={idx}>{error.message}</p>
    });

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    };

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    };

    render() {
        let {username, password, email, passwordConfirmation, errors, loading} = this.state;
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" icon color='orange' textAlign='center'>
                        <Icon name='puzzle piece' color='orange'/>
                        Sign-Up to DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input fluid name='username' icon='user'
                                        className={this.handleInputError(errors, 'username')}
                                        iconPosition='left' placeholder='Username'
                                        type='text' value={username} onChange={this.handleChange}/>
                            <Form.Input fluid name='email' icon='lock'
                                        className={this.handleInputError(errors, 'email')}
                                        iconPosition='left' placeholder='Email'
                                        type='email' value={email} onChange={this.handleChange}/>
                            <Form.Input fluid name='password' icon='lock'
                                        className={this.handleInputError(errors, 'password')}
                                        iconPosition='left' placeholder='Password'
                                        type='password' value={password} onChange={this.handleChange}/>
                            <Form.Input fluid name='passwordConfirmation' icon='lock'
                                        className={this.handleInputError(errors, 'password')}
                                        iconPosition='left' placeholder='Password Confirmation'
                                        type='password' value={passwordConfirmation} onChange={this.handleChange}/>

                            <Button disabled={loading} className={loading ? 'loading' : ''} color='orange' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    {
                        (errors.length > 0)
                            ? <Message error>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                            : ''
                    }
                    <Message>Already a user? <Link to='/login'>Login</Link></Message>
                </Grid.Column>

            </Grid>
        );
    }
};

export default Register;