import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Login from "~/customer/modules/Auth/page/login/Login";
import { changePassword, setOpenModal } from "~/redux/slice/auth/AuthSlice";
import { getAUser } from "~/redux/slice/user/UserSlice";
import SideBar from "../../component/SideBar/SideBar";
import "./Account.scss";

function Account() {
  TabTitle("Tài khoản của tôi");
  const dispatch = useDispatch();
  const { userProfile: profile, isLoading } = useSelector(
    (state) => state.user
  );
  const { isOpenModal, token, messenger } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAUser());
  }, [dispatch]);
  console.log(messenger);
  console.log(isOpenModal);
  useEffect(() => {
    if (messenger !== "") {
      setTimeout(() => {
        toast.success(messenger, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }, 3000);
      dispatch(setOpenModal(false));
    }
  }, [dispatch, messenger]);
  const validationSchema = Yup.object({
    current_password: Yup.string().required("Current Password is required"),
    new_password: Yup.string().required("New Password is required"),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const Modal = () => {
    const initialValues = {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    };

    const handleSubmit = (values) => {
      dispatch(changePassword(values));
      // Xử lý submit form tại đây
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Change Password</h2>
              <span
                className="close"
                onClick={(e) => dispatch(setOpenModal(false))}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <Field
                type="password"
                name="current_password"
                autoComplete="current-password"
                placeholder="Current Password"
                required
              />
              <ErrorMessage name="current_password" component="span" />

              <Field
                type="password"
                name="new_password"
                autoComplete="new-password"
                placeholder="New Password"
                required
              />
              <ErrorMessage name="new_password" component="span" />

              <Field
                type="password"
                name="confirm_new_password"
                autoComplete="new-password"
                placeholder="Confirm Password"
                required
              />
              <ErrorMessage name="confirm_new_password" component="span" />
            </div>
            <div className="modal-footer">
              <button type="submit">Save</button>
            </div>
          </div>
        </Form>
      </Formik>
    );
  };
  const User = () => {
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <ToastContainer />
        <div className="AccountContainer">
          {isOpenModal ? <Modal /> : ""}
          <div className="AccountContainer__left">
            <SideBar />
          </div>
          <div className="AccountContainer__right">
            <div className="item">
              <div className="item__top">
                <NavLink to={`/profile/editprofile`}>
                  <div className="item__top--btn">Edit</div>
                </NavLink>
              </div>
              <div className="item__content">
                <div className="item__content--avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jdCRwv_UItyMFSKNJSxp6f6lgMi1DRz3LV3neY8t6A&s"
                    alt=""
                  />
                </div>
                <div className="item__content--detail">
                  <h1 className="itemTitle">{profile?.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{profile?.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">
                      {profile?.phone ? profile?.phone : "-----------"}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {profile?.address ? profile?.address : "--------"}
                    </span>
                  </div>
                </div>
                <div className="detailItem"></div>
                <div className="detailItem">
                  <button
                    className="detailItem__btn"
                    onClick={(e) => dispatch(setOpenModal(true))}
                  >
                    Change PassWord:
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return token ? <User /> : <Login />;
}
export default Account;
