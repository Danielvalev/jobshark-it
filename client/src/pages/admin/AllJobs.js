import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { deleteJobById, editJob, getAllJobs } from "../../apis/jobService";
import { Table, message } from "antd";
import PageTitle from "../../components/PageTitle";

function AllJobs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);

    const getData = async () => {
        try {
            dispatch(ShowLoading());

            const response = await getAllJobs();
            
            if (response.success) {
                setData(response.data)
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const changeStatus = async (id, status) => {
        try {
            dispatch(ShowLoading());
            const response = await editJob({id, status});
            
            if (response.success) {
                setData(response.data);
                getData();
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    }


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
                <div className="d-flex gap-2 align-items-center">
                    <i className="ri-close-line" onClick={() => deleteJob(record.id)}></i>

                    {record.status === 'approved' && 
                        <span 
                            className="underline"
                            onClick={() => changeStatus(record.id, 'rejected')}>
                            Reject
                        </span>}

                    {((record.status === 'pending') || (record.status === "rejected")) && 
                        <span 
                            className="underline"
                            onClick={() => changeStatus(record.id, 'approved')}>
                            Approve
                        </span>}


                </div>
            )
        },
        
    ];

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
                <PageTitle title="Admin All Jobs"/>
                <button className="btn btn-primary btn-sm" onClick={() => navigate("/posted-jobs/new")}>
                    New Job  
                </button>
            </div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
};

export default AllJobs;