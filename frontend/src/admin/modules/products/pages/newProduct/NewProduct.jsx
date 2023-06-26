import classNames from "classnames/bind";
import styles from "./NewProduct.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import FormInput from "~/admin/component/FormInput/FormInput";
import Select from "~/admin/component/select/Select";
import Textarea from "~/admin/component/textarea/Textarea";
import { productInputs } from "~/admin/constant/productInputs";
import ImgProduct from "../../component/ImgProduct/ImgProduct";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategory } from "~/redux/slice/category/CategorySlice";
import { addFile, clearFiles } from "~/redux/slice/file/FileSlice";
import {
  newProduct,
  resetNewProduct,
  setNewProduct,
} from "~/redux/slice/product/ProductSlice";
import { useFormik } from "formik";

const uploadFiles = createAsyncThunk(
  "files/uploadFiles",
  async (files, { dispatch }) => {
    // Loop through selected files and add them to the store
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      dispatch(addFile(file));
    }
  }
);
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng điền vào trường này"),
  price: Yup.number()
    .typeError("Vui lòng nhập số")
    .min(1, "Số tiền phải lớn hơn 0")
    .required("Vui lòng điền vào trường này")
    .when("price_sale", (price_sale, schema) => {
      return schema.test({
        test: (price) => price > price_sale,
        message: "Giá phải lớn hơn giá khuyến mãi",
      });
    }),
  price_sale: Yup.number()
    .typeError("Vui lòng nhập số")
    .min(0, "Số tiền phải lớn hơn hoặc bằng 0")
    .required("Vui lòng điền vào trường này"),
  num: Yup.number()
    .typeError("Vui lòng nhập số")
    .required("Vui lòng điền vào trường này"),
});
function NewProduct() {
  const cx = classNames.bind(styles);
  const { isSuccessNew, productNew } = useSelector((state) => state.product);
  const { params } = useSelector((state) => state.category);
  const { fileList } = useSelector((state) => state.file);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearFiles());
  }, [dispatch]);
  //handel when submit form success
  useEffect(() => {
    dispatch(getCategory({ params }));

    if (isSuccessNew) {
      toast.success(`Bạn đã tạo thành công product `, {
        position: toast.POSITION.TOP_RIGHT,
      });
      const timeout = setTimeout(() => navigate("/admin/product"), 3000);
      return () => {
        dispatch(resetNewProduct());

        clearTimeout(timeout);
      };
    }
  }, [dispatch, isSuccessNew, navigate, params]);

  //change data to formdata
  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
    fileList.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    return formData;
  }
  //handel file
  function handleFileChange(event) {
    dispatch(clearFiles());

    const files = event.target.files;
    dispatch(uploadFiles(files));
  }
  //handel category
  const handleCategory = (e) => {
    dispatch(
      setNewProduct({
        ...productNew,
        category_id: e.target.value,
      })
    );
  };
  const handelDes = (e) => {
    dispatch(setNewProduct({ ...productNew, description: e.target.value }));
  };
  //handel submit
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      price_sale: "",
      num: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = getFormData({ ...values, ...productNew });
      dispatch(newProduct(data));
    },
  });
  return (
    <>
      <ToastContainer />
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div>
            <ImgProduct />
          </div>
        </div>

        <div className={cx("right")}>
          <form className={cx("right-form")} onSubmit={formik.handleSubmit}>
            <div className="all">
              <div className="upload-btn-wrapper">
                <button className="btn">Upload a file</button>
                <input
                  type="file"
                  multiple
                  name="myfile"
                  onChange={handleFileChange}
                />
              </div>

              <Select
                onChange={(e) => handleCategory(e)}
                value={productNew.category_id}
              />
            </div>

            {productInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                name={input.name}
                onChange={formik.handleChange}
                value={formik.values[input.name]}
                error={formik.touched[input.name] && formik.errors[input.name]}
              />
            ))}

            <Textarea
              onChange={(e) => handelDes(e)}
              value={productNew.description}
            />
            <button className="btn__submit" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
