import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import {
  getADiscount,
  resetUpdateDiscount,
  setSingleDiscount,
  updateDiscount,
} from "~/redux/slice/discount/DiscountSlice";
import "./SingleDiscount.scss";

function SingleDiscount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { discountSingle, isLoading, isLoadingUpdate, discountUpdate } =
    useSelector((state) => state.discount);

  //CALL API A DISCOUNT AND HANDEL UPDATE DISCOUNT
  useEffect(() => {
    dispatch(getADiscount(id));
    if (isLoadingUpdate === false && JSON.stringify(discountUpdate) !== "{}") {
      toast.success(`Cập nhật Category ${id} thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetUpdateDiscount());
      setTimeout(() => navigate("/admin/discount"), 5000);
    }
  }, [navigate, isLoadingUpdate, id, dispatch, discountUpdate]);

  // HANDEL SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("object", { ...discountSingle, id });
    dispatch(updateDiscount({ ...discountSingle, id }));
  };

  const Discount = () => {
    return (
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="DiscountContainer">
          <div className="DiscountContainer__top">
            <NavLink to="/admin/Discount">
              <CloseIcon />
            </NavLink>
          </div>
          <div className="DiscountContainer__container">
            <div className="content">
              <div className="content__input">
                <input
                  type="text"
                  name="code"
                  onChange={(e) =>
                    dispatch(
                      setSingleDiscount({
                        ...discountSingle,
                        code: e.target.value,
                      })
                    )
                  }
                  value={discountSingle.code}
                />
                <label>Code</label>
              </div>
              <div className="content__input">
                <input
                  type="number"
                  name="discount"
                  onChange={(e) =>
                    dispatch(
                      setSingleDiscount({
                        ...discountSingle,
                        discount: e.target.value,
                      })
                    )
                  }
                  value={discountSingle.discount}
                />
                <label>Discount</label>
              </div>
              <div className="content__input">
                <input
                  type="text"
                  name="purchase_limit"
                  onChange={(e) =>
                    dispatch(
                      setSingleDiscount({
                        ...discountSingle,
                        purchase_limit: e.target.value,
                      })
                    )
                  }
                  value={discountSingle.purchase_limit}
                />
                <label>Số lượng</label>
              </div>
              <div className="content__input">
                <input
                  type="text"
                  name="expiration_date"
                  onChange={(e) =>
                    dispatch(
                      setSingleDiscount({
                        ...discountSingle,
                        expiration_date: e.target.value,
                      })
                    )
                  }
                  value={discountSingle.expiration_date}
                />
                <label>Ngày hết hạn</label>
              </div>
              <div className="content__input">
                <input
                  type="text"
                  name="minium_order"
                  onChange={(e) =>
                    dispatch(
                      setSingleDiscount({
                        ...discountSingle,
                        minium_order: e.target.value,
                      })
                    )
                  }
                  value={discountSingle.minium_order}
                />
                <label>Hóa đơn tối thiểu</label>
              </div>
              <div className="content__input">
                <input
                  type="text"
                  name="description"
                  onChange={(e) =>
                    dispatch(
                      setSingleDiscount({
                        ...discountSingle,
                        description: e.target.value,
                      })
                    )
                  }
                  value={discountSingle.description}
                />
                <label>Description</label>
              </div>
            </div>
            <div className="bottom">
              <button type="submit" className="bottom--btn btn-save">
                save change
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };
  //LOADING
  return isLoading ? <Loading /> : <Discount />;
}

export default SingleDiscount;
