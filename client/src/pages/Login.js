import { Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { LoginUser } from './apis/authentication';

export const Login = () => {

    const nav = useNavigate();

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await LoginUser(values);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                
                // save info in localstorage
                localStorage.setItem('user', JSON.stringify(response.data));

                // navigate to list page if success
                nav("/list");

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
                    JobShark Login
                </h3>
                <div className='divider'></div>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item name='email' label='Email'>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name='password' label='Password'>
                        <input type='password' />
                    </Form.Item>
                    <button className='primary-btn w-100' type='submit'>Login</button>
                    <Link to='/register' className='d-block mt-2'>New to JobShark? Join Now</Link>
                </Form>
            </div>
        </div>
    );
};