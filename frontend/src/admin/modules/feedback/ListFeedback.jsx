// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Loading from "~/admin/component/Loading/Loading";
// import Pagination from "~/admin/layouts/component/Pagination/Pagination";
// import Top from "~/admin/layouts/component/top/Top";
// import {
//   getListFeedback,
//   setParams,
// } from "~/redux/slice/feedback/FeedbackSlice";
// import "./ListFeedback.scss";
// import FeedbackItem from "./component/FeedbackItem/FeedbackItem";

// const ListFeedback = () => {
//   //   const { isLoading, currentPage, totalPages, params } = useSelector(
//   //     (state) => state.feedback
//   //   );
//   //   const dispatch = useDispatch();

//   //   useEffect(() => {
//   //     dispatch(getListFeedback(params));
//   //   }, [dispatch, params]);

//   //   const handlePageChange = (e, pageNumber) => {
//   //     e.preventDefault();
//   //     dispatch(setParams({ ...params, page: pageNumber }));
//   //   };

//   //   const Feedback = () => {
//   //     return (
//   //       <div className="ListDiscountContainer">
//   //         <Top title="Danh sách Feedback" to="newDiscount" />
//   //         <div className="discount">
//   //           <div className="discount__row discount__header-labels">
//   //             <div className="text-center">ID</div>
//   //             <div className="text-center">Email</div>
//   //             <div className="text-center">Nội dung </div>
//   //             <div className="text-center">Ngày Tạo</div>
//   //             <div className="text-center">Ngày Hết hạn</div>
//   //             <div className="text-center">Action</div>
//   //           </div>
//   //           {/* <FeedbackItem /> */}
//   //         </div>
//   //         {totalPages > 0 && (
//   //           <Pagination
//   //             currentPage={currentPage}
//   //             totalPages={totalPages}
//   //             onPageChange={handlePageChange}
//   //           />
//   //         )}
//   //       </div>
//   //     );
//   //   };

//   //   return isLoading ? <Loading /> : <Feedback />;
//   // };
//   return 1;
// };
// export default ListFeedback;
import React from "react";

function ListFeedback() {
  return (
    <div>
      <h3>hídh</h3>
    </div>
  );
}

export default ListFeedback;
