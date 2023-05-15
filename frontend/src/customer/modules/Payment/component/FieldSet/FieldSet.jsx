import React from "react";
import Field from "../Field/Field";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "~/redux/slice/auth/AuthSlice";
import Address from "../address/Address";

function FieldSet() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="fieldset">
      <Field
        className={"field__required"}
        label={"Họ và tên"}
        type={"text"}
        value={userInfo.name}
        onChange={(e) =>
          dispatch(setUserInfo({ ...userInfo, name: e.target.value }))
        }
      />
      <Field
        className={"field-two-thirds"}
        label={"Email"}
        type={"text"}
        value={userInfo.email}
        onChange={(e) =>
          dispatch(setUserInfo({ ...userInfo, email: e.target.value }))
        }
      />
      <Field
        className={"field-required field-third"}
        label={"Số điện thoại"}
        type={"text"}
        value={userInfo.phone}
        onChange={(e) =>
          dispatch(setUserInfo({ ...userInfo, phone: e.target.value }))
        }
      />
      <Address />
      <Field
        className={"field__required"}
        label={"Địa chỉ cụ thể"}
        type={"text"}
        value={userInfo.address}
        onChange={(e) =>
          dispatch(
            setUserInfo({
              ...userInfo,
              address: e.target.value,
            })
          )
        }
      />
    </div>
  );
}

export default FieldSet;
