import { Form } from 'antd';
import { Link } from 'react-router-dom';

export const Login = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
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