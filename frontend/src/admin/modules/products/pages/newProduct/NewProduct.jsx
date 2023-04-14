import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import classNames from "classnames/bind";
import styles from "./NewProduct.scss";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import productInputs from "~/admin/constant/productInputs";
import arrActive from "~/admin/constant/arrActive";
import Radio from "~/admin/component/radio/radio";
import Textarea from "~/admin/component/textarea/Textarea";
import FormInput from "~/admin/component/FormInput/FormInput";
import Select from "~/admin/component/select/Select";

function NewProduct(props) {
  const cx = classNames.bind(styles);
  const imgDiv = useRef();

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [active, setActive] = useState(true);
  const [listCategory, setListCategory] = useState([]);
  const [category_id, setCategory_id] = useState(0);
  const [imgList, setImgList] = useState([]);
  const [imageURLS, setImageURLS] = useState([]);
  const [imgListApi, setImgListApi] = useState([]);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    price: "",
    price_sale: "",
    num: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    setImgList([...e.target.files]);
  };

  useEffect(() => {
    if (imgList.length < 1) return;
    const newImageUrls = [];
    imgList.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLS(newImageUrls);
  }, [imgList]);

  useEffect(() => {
    if (!imgList) return;
    const newImage = [];
    imgList.forEach((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        newImage.push(reader.result);
      };
    });
    setImgListApi(newImage);
  }, [imgList]);

  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <div className={cx("left-imgContainer")}>
          <img
            className={cx("cellImg")}
            src={
              imageURLS.length > 0
                ? imageURLS[index]
                : "https://vsam1040chicago.com/noimage.png"
            }
            ref={imgDiv}
            alt=""
          />
          <div className={cx("thumbImg")}>
            {imageURLS.length <= 4 &&
              imageURLS.map((img, index) => (
                <img
                  src={img}
                  alt=""
                  key={index}
                  onClick={() => setIndex(index)}
                />
              ))}
          </div>
        </div>
      </div>

      <div className={cx("right")}>
        <form className={cx("right-form")}>
          <div className={cx("formImg")}>
            <label htmlFor="file">Image: </label>
            <DriveFolderUploadOutlinedIcon />
            <input
              type="file"
              id="file"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              multiple
            />
          </div>
          <Select setCategory_id={setCategory_id} />

          {productInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Textarea setContent={setContent} />
          {arrActive.map((input) => (
            <Radio
              setActive={setActive}
              active={active}
              input={input}
              key={input.id}
            />
          ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
