import { Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { RegisterUser } from './apis/authentication';

export const Register = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());

            const response = await RegisterUser(values);

            dispatch(HideLoading());

            if (response.success) {
                message.success(response.message);
                nav('/login');
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(ShowLoading());

            message.error(error.message);

            dispatch(HideLoading());
        }
    }

    return (
        <div className='h-screen d-flex justify-content-center align-items-center background-main'>
            <div className='background-white p-4 width-secondary'>
                <h3 className='d-flex justify-content-center'>
                    JobShark Register
                </h3>
                <div className='divider'></div>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item name='name' label='Name'>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name='email' label='Email'>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name='password' label='Password'>
                        <input type='password' />
                    </Form.Item>
                    <button className='primary-btn w-100' type='submit'>Register</button>
                    <Link to='/login' className='d-block mt-2'>Already a member? Login</Link>
                </Form>
            </div>
        </div>
    );
};