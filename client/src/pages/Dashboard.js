import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getAllJobs } from "./apis/jobs";
import { Col, Row, message } from "antd";
import PageTitle from "../components/PageTitle";

export const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllJobs();

            if (response.success) {
                const approvedJobs = response.data.filter(
                    (job) => job.status === "approved");
                setData(approvedJobs);
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
    }, []);

    return (
        <div>
            <PageTitle title="Welcome to Job Shark"/>

            <Row gutter={[10, 10]} className="mt-3">
                {data.map((job) => (
                    <Col span={8} key={job.id}>
                        <div className="job-card">
                            <h3 className="uppercase">{job.jobTitle}</h3>
                            <div className="divider"></div>

                            <div className="d-flex justify-content-between">
                                <span>Company</span>
                                <span>{job.company}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Location</span>
                                <span className="uppercase">{job.location}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Posted On</span>
                                <span>{job.postedOn}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Last Date to Apply</span>
                                <span>{job.lastDateToApply}</span>
                            </div>
                            <button className="btn btn-primary w-100 mt-2 uppercase" onClick={() => navigate(`/posted-job/${job.id}`)}>More info</button>
                        </div>

                    </Col>
                ))}
            </Row>
        </div>
    )
};