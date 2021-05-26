import { gql, useMutation } from '@apollo/client';
import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../../utils/hooks';

export const Login = (props) => {

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result)
            props.history.push('/');
        },
        variables: values
      });

      function loginUserCallback() {
        loginUser();
      }    

    return (
      <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}  >
          <h1>Login</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
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
          <Button type="submit" primary>
            Login
          </Button>
        </Form>
      </div>
    )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
