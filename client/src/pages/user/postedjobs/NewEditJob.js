import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Form, Row, Col, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { addNewJobPost, editJob, getJobById } from "../../apis/jobs";

function NewEditJob() {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [jobData, setJobData] = useState(null);

  const onFinish = async (values) => {
    try {
        dispatch(ShowLoading())
        let response = null
        if (params.id) {
            response = await editJob({
                ...values,
                id: params.id,
            });
        } else {
            response = await addNewJobPost(values);
        }

        if (response.success) {
            message.success(response.message);
            navigate('/posted-jobs');
        } else {
            message.error(response.message);
        }

        dispatch(HideLoading())
    } catch (error) {
        dispatch(HideLoading())
        message.error(error.message);
    }
  };

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
    }
    useEffect(() => {
        if (params.id) {
            getData()
        } else {
            setJobData({});
        }
        
        // eslint-disable-next-line
    }, []);

  return (
    <div>
      <PageTitle title={params.id ? "Edit Job" : "Add New Job"} />
      {jobData && (
      <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Job Title"
              name="jobTitle"
              rules={[{ required: true, message: "Please enter job title" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Industry"
              name="industry"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="finance">Finance</option>
                <option value="gambling">Gambling</option>
                <option value="medicine">Medicine</option>
                <option value="other">Other</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="bulgaria">Bulgaria</option>
                <option value="usa">USA</option>
                <option value="remote">Remote</option>
                <option value="other">Other</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Company Name"
              name="company"
              rules={[{ required: true, message: "Please enter job title" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "Please enter job title" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: "Please enter job title" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Last Date To Apply"
              name="lastDateToApply"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Notice Period"
              name="noticePeriod"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Job Description"
              name="jobDescription"
              rules={[{ required: true, message: "required" }]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-danger" onClick={() => navigate('/posted-jobs')}>Cancel</button>
            <button className="btn btn-success" type="submit">Save</button>
        </div>
      </Form>)}
    </div>
  );
}

export default NewEditJob;
