import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getJobById } from "../apis/jobService";
import { Col, Row, message } from "antd";
import PageTitle from "../components/PageTitle";

function JobPublicView() {
    
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [jobData, setJobData] = useState(null);




    const getData = async () => {
        try {
            dispatch(ShowLoading());
    
            const response = await getJobById(params.id);
    
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

    useEffect(() => {
        if (params.id) {
            getData()
        } else {
            setJobData({});
        }
        // getData();
        // eslint-disable-next-line
    }, []);

    return jobData && (
        <div>
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <span className="navbar-brand d-flex align-items-center">
              <strong><Link to="/" className="link-title">JobShark-IT</Link></strong>
            </span>
          </div>
        </div>
      </header>

      <main>
        <section className="py-2 text-center container">
          <div className="row py-lg-1">
            <div className="col-lg-6 col-md-8 mx-auto">
              <p className="lead text-muted">
                You like that Job? Then create a registration and apply.
              </p>
              <div>

                <Link to='/register' className='btn btn-secondary my-2'>Register</Link>
                
              </div>
            </div>
          </div>
        </section>
        
        <div className="album py-5 bg-light">
          <div className="container">
            <div>
            <PageTitle title={jobData.jobTitle} />

            <Row gutter={[10, 10]}>
                <Col span={24}>
                    <div className="d-flex flex-column gap-2">
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
                    </div>
                    <div className="divider"></div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary btn-md uppercase" onClick={() => navigate('/')}>Back</button>
                    </div>
                    
            </Col>
            </Row>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-muted py-5">
      <div className="container">
        <p className="mb-1">JobShark-IT</p>
        <p className="mb-0">Created by Daniel Valev</p>
      </div>
    </footer>
    </div>
    
    )
};

export default JobPublicView;