import CreateIcon from "@mui/icons-material/Create";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./FeedbackItem.scss";

function FeedbackItem() {
  const { ListFeedback } = useSelector((state) => state.feedback);

  //   return ListFeedback.length > 0 ? (
  //     ListFeedback?.map((feedback, index) => {
  //       return (
  //         <div className="discount__row" key={index}>
  //           <div className="discount__row--id text">{feedback.id}</div>
  //           <div className="discount__row--description text">{feedback.code}</div>
  //           <div className="discount__row--createdAt text">
  //             {feedback.purchase_limit}
  //           </div>
  //           <div className="discount__row--createdAt text">
  //             {moment(feedback.created_at).format("YYYY-MM-DD")}
  //           </div>
  //           <div className="discount__row--updateAt text">
  //             {feedback.expiration_date}
  //           </div>
  //           <div className="discount__row--action text">
  //             <NavLink to={`/admin/feedback/${feedback.id}`}>
  //               <CreateIcon />
  //             </NavLink>
  //           </div>
  //         </div>
  //       );
  //     })
  //   ) : (
  //     <div className="noDiscount">Hiện tại không có discount nào 😉 </div>
  //   );
}

export default FeedbackItem;
