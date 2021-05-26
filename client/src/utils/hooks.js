import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        confirmEmail: ''
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
      };

    return {
      onChange,
      onSubmit,
      values
    };
}