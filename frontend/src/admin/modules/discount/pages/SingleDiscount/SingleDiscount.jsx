// import CloseIcon from "@mui/icons-material/Close";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Loading from "~/admin/component/Loading/Loading";
// import {
//   getADiscount,
//   setUpdateDiscount,
//   updateDiscount,
// } from "~/redux/slice/discount/DiscountSlice";
// import { inputFields } from "../../component/MenuDiscount";
// import "./SingleDiscount.scss";

// function SingleDiscount() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { discountSingle, isLoading, discountUpdate } = useSelector(
//     (state) => state.discount
//   );
//   const [updateSingle, setUpdateSingle] = useState(discountSingle);
//   useEffect(() => {
//     dispatch(getADiscount(id));
//   }, [dispatch, id]);
//   console.log(JSON.stringify(discountUpdate) !== "{}");
//   //   useEffect(() => {
//   //     if (JSON.stringify(discountUpdate) !== "{}") {
//   //       toast.success(`Cập nhật Discount  thành công`, {
//   //         position: toast.POSITION.TOP_RIGHT,
//   //       });
//   //       setTimeout(() => {
//   //
//   //         navigate("/admin/discount");
//   //       }, 3000);
//   //     }
//   //   }, [navigate, dispatch, discountUpdate]);

//   //----------handle submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateDiscount({ ...discountSingle, id }));
//   };
//   //-----------handle change
//   const handleChange = (e) => {
//     e.preventDefault();
//     setUpdateSingle(e.target.value);
//   };

//   const Discount = () => {
//     return (
//       <form onSubmit={handleSubmit}>
//         <div className="DiscountContainer">
//           <ToastContainer />
//           <div className="DiscountContainer__top">
//             <NavLink to="/admin/Discount">
//               <CloseIcon />
//             </NavLink>
//           </div>
//           <div className="DiscountContainer__container">
//             <div className="content">
//               {inputFields.map((field) => {
//                 return (
//                   <div className="content__input" key={field.name}>
//                     <input
//                       type=""
//                       name={field.name}
//                       id={field.name}
//                       onChange={(e) => handleChange(e, field.name)}
//                       value={updateSingle[field.name]}
//                       required
//                     />
//                     <label>{field.label}</label>
//                   </div>
//                 );
//               })}
//               <input
//                 type=""
//                 name="code"
//                 onChange={(e) => handleChange(e)}
//                 value={updateSingle.code}
//                 required
//               />
//               <label>Code</label>
//             </div>

//             <div className="bottom">
//               <button type="submit" className="bottom--btn btn-save">
//                 save change
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     );
//   };

//   return isLoading ? <Loading /> : <Discount />;
// }

// export default SingleDiscount;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import InputForm from "~/admin/modules/category/component/InputForm/InputForm";
import {
  getADiscount,
  setUpdateDiscount,
  updateDiscount,
} from "~/redux/slice/discount/DiscountSlice";

function SingleDiscount() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getADiscount(id));
  }, [dispatch, id]);
  const { discountSingle, isLoading, discountUpdate } = useSelector(
    (state) => state.discount
  );

  useEffect(() => {
    if (JSON.stringify(discountUpdate) !== "{}") {
      toast.success(`Cập nhật Discount  thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/admin/discount");
      }, 3000);
    }
  }, [navigate, dispatch, discountUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDiscount({ ...discountSingle, id }));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="DiscountContainer">
        <ToastContainer />

        <div className="DiscountContainer__container">
          <div className="content">
            <InputForm
              label="Code"
              name="code"
              type="text"
              onChange={(e) =>
                dispatch(
                  setUpdateDiscount({ ...discountSingle, code: e.target.value })
                )
              }
              value={discountSingle.code}
              classNameContent="content__input"
            />
            <InputForm
              label="Discount"
              name="discount"
              type="text"
              onChange={(e) =>
                dispatch(
                  setUpdateDiscount({
                    ...discountSingle,
                    discount: e.target.value,
                  })
                )
              }
              value={discountSingle.discount}
              classNameContent="content__input"
            />
            <InputForm
              label="Description"
              name="description"
              type="text"
              onChange={(e) =>
                dispatch(
                  setUpdateDiscount({
                    ...discountSingle,
                    description: e.target.value,
                  })
                )
              }
              value={discountSingle.description}
              classNameContent="content__input"
            />
            <InputForm
              label="Hóa đơn tối"
              name="minium_order"
              type="text"
              onChange={(e) =>
                dispatch(
                  setUpdateDiscount({
                    ...discountSingle,
                    minium_order: e.target.value,
                  })
                )
              }
              value={discountSingle.minium_order}
              classNameContent="content__input"
            />
            <InputForm
              label="Purchase_limit"
              name="purchase_limit"
              type="text"
              onChange={(e) =>
                dispatch(
                  setUpdateDiscount({
                    ...discountSingle,
                    purchase_limit: e.target.value,
                  })
                )
              }
              value={discountSingle.purchase_limit}
              classNameContent="content__input"
            />
            <InputForm
              label="Ngày hết hạn"
              name="expiration_date"
              type="text"
              onChange={(e) =>
                dispatch(
                  setUpdateDiscount({
                    ...discountSingle,
                    expiration_date: e.target.value,
                  })
                )
              }
              value={discountSingle.expiration_date}
              classNameContent="content__input"
            />
          </div>

          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <input type="reset" value="Reset" className="bottom--btn " />
          </div>
        </div>
      </div>
    </form>
  );
}

export default SingleDiscount;
