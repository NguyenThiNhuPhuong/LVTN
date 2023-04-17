import moment from "moment/moment";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

import "./CategoryItem.scss";
import {
  getCategory,
  removeCategory,
  resetRemoveCategory,
} from "~/redux/slice/category/CategorySlice";

function CategoryItem() {
  const dispatch = useDispatch();

  const { categoryList, alertDeleteSuccess } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (alertDeleteSuccess !== "") {
      dispatch(getCategory());
      return () => {
        dispatch(resetRemoveCategory());
      };
    }
  }, [dispatch, alertDeleteSuccess]);

  const handelRemoveCategory = (id) => {
    return Swal.fire({
      title: `Bạn có chắc chắn muốn xóa category ${id}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCategory(id));
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return categoryList?.map((category, index) => {
    return (
      <div className="category__row" key={index}>
        <div className="category__row--id text">{category.id}</div>
        <div className="category__row--name text">{category.name}</div>
        <div className="category__row--description text">
          {category.description}
        </div>
        <div className="category__row--createdAt text">
          {moment(category.created_at).format("YYYY-MM-DD")}
        </div>
        <div className="category__row--updateAt text">
          {moment(category.updated_at).format("YYYY-MM-DD")}
        </div>
        <div className="category__row--action text">
          <NavLink to={`/admin/category/${category.id}`}>
            <VisibilityIcon />
          </NavLink>
          <button onClick={() => handelRemoveCategory(category.id)}>
            <DeleteIcon />
          </button>
        </div>

        <div className="category__row--active text">
          <section>
            <div className="input-wrap">
              <input
                id="input-6"
                type="checkbox"
                onChange={() => {}}
                checked={category.active === 1 ? true : false}
              />
              <label htmlFor="input-6">Select</label>
            </div>
          </section>
        </div>
      </div>
    );
  });
}

export default CategoryItem;
