import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { deleteJobById, getPostedJobsByUserId } from "../../apis/jobs";
import { Table, message } from "antd";

function PostedJobs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);

    
    // columns for the Table dataIndexes must match
    const columns = [
        {
            title: "Title",
            dataIndex: 'jobTitle',
        },
        {
            title: "Company",
            dataIndex: 'company',
        },
        {
            title: "Posted On",
            dataIndex: "postedOn",
        },
        {
            title: "Last Date to Apply",
            dataIndex: "lastDateToApply",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-2">
                    <i className="ri-pencil-line" onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}></i>
                    <i className="ri-close-line" onClick={() => deleteJob(record.id)}></i>
                </div>
            )
        },
        
    ];

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const user = JSON.parse(localStorage.getItem('user'));

            const response = await getPostedJobsByUserId(user.id);
            
            if (response.success) {
                setData(response.data)
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const deleteJob = async (id) => {
        try {
            dispatch(ShowLoading());

            const response = await deleteJobById(id);
            
            if (response.success) {
                setData(response.data)

                // load data
                getData();
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
                <PageTitle title="Posted Jobs"/>
                <button className="btn btn-primary btn-sm" onClick={() => navigate("/posted-jobs/new")}>
                    New Job  
                </button>
            </div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
};

export default PostedJobs;