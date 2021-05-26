import React, { useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import { useForm } from '../../utils/hooks';
import { AuthContext } from '../../context/auth';

export const Register = (props) => {
    const context = useContext(AuthContext)

    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: '',
        email: '',
        confirmEmail: ''
    })
    
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result){
            console.log(result)
            context.login(result.data.register)
            props.history.push('/')
        },
        variables: values
    })

    function registerUser(){
      addUser()
    }

    return (
      <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
          <h1>Register</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
            onChange={onChange} 
          />
          <Form.Input
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            value={values.email}
            onChange={onChange} 
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={values.password}
            onChange={onChange} 
          />
          <Form.Input
            label="Confirm Password"
            placeholder="Confirm Password.."
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={onChange} 
          />
          <Button type="submit" primary>
            Register
          </Button>
        </Form>
      </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`