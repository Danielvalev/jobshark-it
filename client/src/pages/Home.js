import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getAllJobs } from "./apis/jobs";
import { message } from "antd";

function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState([]);

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
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <span className="navbar-brand d-flex align-items-center">
              <strong>JobShark-IT</strong>
            </span>
          </div>
        </div>
      </header>

      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">In a world full of fish, be a shark</h1>
              <p className="lead text-muted">
                All IT Jobs in one place. If you want to be in the sea, you better be a shark.
                Post a Job or find the right person for your team!
              </p>
              <div>
                <Link to='/login' className='btn btn-primary my-2'>Login</Link>
                <Link to='/register' className='btn btn-secondary my-2'>Register</Link>
                
              </div>
            </div>
          </div>
        </section>
        
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {data.map((job) => (
                <div className="col" key={job.id}>
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <div className="card-text">
                        <h5 className="uppercase">{job.jobTitle}</h5>
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
                                <span>Salary</span>
                                <span>${job.salary}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Type</span>
                                <span>{job.jobType}</span>
                            </div>
                        </div>
                        <div className="divider"></div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => navigate(`/job/${job.id}`)}
                            >
                              View
                            </button>
                          </div>
                          <small className="text-muted">Apply before: {job.lastDateToApply}</small>
                        </div>
                      </div>
                    </div>
                  </div>
            ))}
              
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
  );
}

export default Home;
