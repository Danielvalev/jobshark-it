import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { Table, message } from "antd";
import PageTitle from "../../components/PageTitle";
import { getAllUsers, updateUserProfile } from "../../apis/userService";

function AllUsers() {

    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);

    const changeStatus = async (id, status) => {
        try {
            dispatch(ShowLoading());
            
            const response = await updateUserProfile({ id, status });

            if (response.success) {
                setData(response.data);
                getData();
            }

            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    // columns for the Table dataIndexes must match
    const columns = [
        {
            title: "Name",
            dataIndex: 'name',
        },
        {
            title: "Email",
            dataIndex: 'email',
        },
        {
            title: "User ID",
            dataIndex: 'id',
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="d-flex gap-2 align-items-center">

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

    const getData = async () => {
        try {
            dispatch(ShowLoading());

            const response = await getAllUsers();
            
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
                <PageTitle title="All Users"/>
            </div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
};

export default AllUsers;