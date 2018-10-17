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
import {Button, Form, Grid, Header, Icon, Message, Segment} from 'semantic-ui-react';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false,
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        if(this.isFormValid(this.state)) {
            this.setState({errors: [], loading: true});
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signedInUser => {
                    console.log('signedIn User', signedInUser);
                    this.setState({loading: false});
                })
                .catch(err => {
                    console.error('ERROR', err);
                    this.setState((prevState) => ({ errors: prevState.errors.concat(err), loading: false}));
                })
        }
    };


    displayErrors = errors => errors.map((error,idx) => {
        return <p key={idx}>{error.message}</p>
    });

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    };

    isFormValid = ({email, password}) => email && password;



    render() {
        let {password, email, errors, loading} = this.state;
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" icon color='violet' textAlign='center'>
                        <Icon name='code branch' color='violet'/>
                        Login To DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input fluid name='email' icon='lock'
                                        className={this.handleInputError(errors, 'email')}
                                        iconPosition='left' placeholder='Email'
                                        type='email' value={email} onChange={this.handleChange}/>
                            <Form.Input fluid name='password' icon='lock'
                                        className={this.handleInputError(errors, 'password')}
                                        iconPosition='left' placeholder='Password'
                                        type='password' value={password} onChange={this.handleChange}/>

                            <Button disabled={loading} className={loading ? 'loading' : ''} color='violet' fluid size='large'>Submit</Button>
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
                    <Message>Not a User? <Link to='/register'>Register</Link></Message>
                </Grid.Column>

            </Grid>
        );
    }
};

export default Login;