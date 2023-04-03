import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { Col, Row, message } from "antd";
import { applyJob, getApplicationsByJobId, getJobById } from "./apis/jobs";
import PageTitle from "../components/PageTitle";



function JobView() {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [jobData, setJobData] = useState(null);

    const [showApplyButton, setShowApplyButton] = useState(true);

    const [alreadyApply, setAlredyApply] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const getData = async () => {
        try {
            dispatch(ShowLoading());
    
            const response = await getJobById(params.id);

            // check if the job is from the same user
            if (response.data.postedByUserId === JSON.parse(localStorage.getItem('user')).id) {
                setShowApplyButton(false);
            }
            
            const applicationsResponse = await getApplicationsByJobId(params.id);
            

            if (applicationsResponse.data.filter((item) => item.userId === user.id).length > 0) {
                setShowApplyButton(false);
                setAlredyApply(true);
            }
    
            dispatch(HideLoading());
    
            if (response.success) {
    
                setJobData(response.data)
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const applyNow = async () => {
        try {
            dispatch(ShowLoading());
            const response = await applyJob(jobData);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                navigate("/dashboard");
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };


    useEffect(() => {
        if (params.id) {
            getData()
        } else {
            setJobData({});
        }
        // getData();
        // eslint-disable-next-line
    }, []);

    return jobData && 
        <div>
            <PageTitle title={jobData.jobTitle} />

            <Row gutter={[10, 10]}>
                <Col span={18}>
                    <div className="d-flex flex-column gap-1">
                        <div className="d-flex justify-content-between mt-1">
                            <span>Company</span>
                            <span>{jobData.company}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Location</span>
                            <span className="uppercase">{jobData.location}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Industry</span>
                            <span className="uppercase">{jobData.industry}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Salary</span>
                            <span>${jobData.salary}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Experience</span>
                            <span>{jobData.experience} Years</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Notice Period</span>
                            <span>{jobData.noticePeriod} days</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Job Type</span>
                            <span>{jobData.jobType}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Posted On</span>
                            <span>{jobData.postedOn}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Last Date to Apply</span>
                            <span>{jobData.lastDateToApply}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span>Posted By</span>
                            <span>{jobData.postedByUserName}</span>
                        </div>
                        <h5 className="underline job-description">Job Description</h5>
                        <span className="pt-2">{jobData.jobDescription}</span>

                        
                        {alreadyApply && (
                            <div className="already-apply">
                                <span>You already apply for this job.</span>
                            </div>
                            )}
                        
                    </div>
            </Col>
            </Row>
            <div className="divider"></div>
            <div className="d-flex gap-2 mt-3 justify-content-end">
                <button className="btn btn-danger btn-sm uppercase" onClick={() => navigate('/dashboard')}>Cancel</button>
                {showApplyButton && <button className="btn btn-success btn-sm uppercase" onClick={applyNow}>Apply</button>}
            </div>
        </div>
};


export default JobView;