import "./SingleProduct.scss";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import FormInput from "~/admin/component/FormInput/FormInput";
import Select from "~/admin/component/select/Select";
import Textarea from "~/admin/component/textarea/Textarea";
import productInputs from "~/admin/constant/productInputs";
import { getCategory } from "~/redux/slice/category/CategorySlice";
import { addFile } from "~/redux/slice/file/FileSlice";
import {
  getAProduct,
  resetUpdateProduct,
  setUpdateProduct,
  updateProduct,
} from "~/redux/slice/product/ProductSlice";
import ImgProduct from "../../component/ImgProduct/ImgProduct";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { productSingle, productUpdate, isSuccessUpdate } = useSelector(
    (state) => state.product
  );
  const { fileList } = useSelector((state) => state.file);

  //--------call api get a product and alert  when update product success--------
  useEffect(() => {
    dispatch(getAProduct(id));
    dispatch(getCategory());

    if (Object.keys(isSuccessUpdate).length !== 0) {
      toast.success(`Bạn đã cập nhật thành công product ${id}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      const timeout = setTimeout(() => navigate("/admin/product"), 3000);
      return () => {
        dispatch(resetUpdateProduct());
        clearTimeout(timeout);
      };
    }
  }, [dispatch, id, isSuccessUpdate, navigate]);

  // -----------------------change list file-----------------------------------------
  function handleFileChange(event) {
    const files = event.target.files;
    dispatch(uploadFiles(files));
  }
  //-------------change object=>form data------------------
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
  //---------------when onclick button submit--------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getFormData(productUpdate);
    dispatch(updateProduct({ id, data }));
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="left">
          <div>
            <ImgProduct />
          </div>
        </div>

        <div className="right">
          <form className="right-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form__top">
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
                value={productSingle.category_name}
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
              value={productSingle ? productSingle.description : ""}
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
