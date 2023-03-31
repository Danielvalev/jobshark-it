import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Tabs, Form, message } from 'antd';
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import {useDispatch} from "react-redux";
import { getUserProfile, updateUserProfile } from "../../apis/users";
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';

const { TabPane } = Tabs;



function Profile() {

    const dispatch = useDispatch();

    const [userData, setUserData] = React.useState(null);

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await updateUserProfile(values);
            dispatch(HideLoading());

            if (response.success) {
                message.success(response.message);
            } else {
                message.error(response.message);
            }

        } catch (error) {
            dispatch(ShowLoading());
            message.error(error.message);
            dispatch(HideLoading());
        }

    };

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const user = JSON.parse(localStorage.getItem('user'));

            const response = await getUserProfile(user.id);

            dispatch(HideLoading());

            if (response.success) {

                setUserData(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <PageTitle title="Profile"/>
            {userData && (
            <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
            
            <Tabs defaultActiveKey="1">
                <TabPane tab="Personal Info" key="1"><PersonalInfo /></TabPane>

                <TabPane tab="Education / Certificates " key="2"><Education /></TabPane>

                <TabPane tab="Experience" key="3"><Experience /></TabPane>
            </Tabs>
            <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-danger">Cancel</button>
                <button className="btn btn-success" type="submit">Save</button>
            </div>
            </Form>
            )}
        </div>
    )
};

export default Profile;
