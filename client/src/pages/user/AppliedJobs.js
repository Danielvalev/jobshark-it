import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { getApplicationsByUserId } from "../../apis/jobService";
import { Table, message } from "antd";

function AppliedJobs() {

    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    
    // columns for the Table dataIndexes must match
    const columns = [
        {
            title: "Job",
            dataIndex: 'jobTitle',
        },
        {
            title: "Company",
            dataIndex: 'company',
        },
        {
            title: "Applied On",
            dataIndex: "appliedOn",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        
    ];

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const user = JSON.parse(localStorage.getItem('user'));

            const response = await getApplicationsByUserId(user.id);
            
            if (response.success) {
                setData(response.data)
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between">
                <PageTitle title="Applied Jobs"/>
            </div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
};

export default AppliedJobs;