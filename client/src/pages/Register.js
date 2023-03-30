import { Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { RegisterUser } from './apis/authentication';

export const Register = () => {

    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values);
            if (response.success) {
                message.success(response.message);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
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