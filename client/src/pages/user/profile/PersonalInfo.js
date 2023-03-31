import { Row, Col, Form } from "antd";
import React from "react";

function PersonalInfo() {
    return (
        <Row gutter={[10, 10]}>
            <Col span={8}>
                <Form.Item label="First Name" name='firstName'>
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="Last Name" name='lastName'>
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="Email" name='email'>
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="Phone Number" name='phoneNumber'>
                    <input type="text" />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="Portfolio Link" name='portfolio'>
                    <input type="text" />
            </Form.Item>
            </Col>
        </Row>
    )
};

export default PersonalInfo;