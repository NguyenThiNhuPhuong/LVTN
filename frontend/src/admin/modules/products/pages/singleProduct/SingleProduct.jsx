import classNames from "classnames/bind";
import styles from "./SingleProduct.scss";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import FormInput from "~/admin/component/FormInput/FormInput";
import Select from "~/admin/component/select/Select";
import Textarea from "~/admin/component/textarea/Textarea";
import productInputs from "~/admin/constant/productInputs";
import {
  getAProduct,
  newProduct,
  resetUpdateProduct,
  setUpdateProduct,
} from "~/redux/slice/product/ProductSlice";
import { getCategory } from "~/redux/slice/category/CategorySlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFile } from "~/redux/slice/file/FileSlice";
import ImgProduct from "../../component/ImgProduct/ImgProduct";
import { ToastContainer, toast } from "react-toastify";

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

function SingleProduct() {
  const { id } = useParams();
  const cx = classNames.bind(styles);
  const { productSingle, productUpdate, isSuccessNew } = useSelector(
    (state) => state.product
  );
  const { fileList } = useSelector((state) => state.file);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAProduct(id));

    dispatch(getCategory());

    if (isSuccessNew) {
      toast.success(`Bạn đã tạo thành công product `, {
        position: toast.POSITION.TOP_RIGHT,
      });
      const timeout = setTimeout(() => navigate("/admin/product"), 3000);
      return () => {
        dispatch(resetUpdateProduct());
        clearTimeout(timeout);
      };
    }
  }, [dispatch, id, isSuccessNew, navigate]);

  function handleFileChange(event) {
    const files = event.target.files;
    dispatch(uploadFiles(files));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

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

    const data = getFormData(productUpdate);
    dispatch(newProduct(data));
  };

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
          <form className={cx("right-form")} onSubmit={(e) => handleSubmit(e)}>
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
                onChange={(e) =>
                  dispatch(
                    setUpdateProduct({
                      ...productSingle,
                      category_id: e.target.value,
                    })
                  )
                }
              />
            </div>

            {productInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={productSingle ? productSingle[input?.name] : ""}
                onChange={(e) =>
                  dispatch(
                    setUpdateProduct({
                      ...productSingle,
                      [input.name]: e.target.value,
                    })
                  )
                }
              />
            ))}
            <Textarea
              onChange={(e) =>
                dispatch(
                  setUpdateProduct({
                    ...productSingle,
                    description: e.target.value,
                  })
                )
              }
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

export default SingleProduct;
