import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SideBar from "../../Component/SideBar/SideBar";
import "./Rating.scss";
import { useDispatch, useSelector } from "react-redux";
import { newFeedback } from "~/redux/slice/feedback/FeedbackSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Login from "~/customer/modules/Auth/page/login/Login";
function Rating() {
  const { feedbackNew } = useSelector((state) => state.feedback);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(feedbackNew).length !== 0) {
      toast.success(`Cảm ơn góp ý của bạn `, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => navigate("/product/shop"), 3000);
    }
  }, [dispatch, feedbackNew, navigate]);
  const initialValues = {
    email: "",
    content: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    content: Yup.string().required("Content is required"),
  });
  const handleSubmit = (values) => {
    console.log(values); // In ra giá trị của email và content khi form được submit
    dispatch(newFeedback(values));
  };
  return token ? (
    <>
      <ToastContainer />
      <div className="RatingContainer">
        <SideBar />
        <div className="RatingContainer__content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div>
                <label htmlFor="content">Content:</label>
                <Field as="textarea" id="content" name="content" />
                <ErrorMessage name="content" component="div" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  ) : (
    <Login />
  );
}

export default Rating;
