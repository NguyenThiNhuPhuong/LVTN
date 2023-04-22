import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
  setValueDistrict,
  setValueProvince,
  setValueWard,
} from "~/redux/slice/address/AddressSlice";
import Field from "../Field/Field";
import { setUserInfo } from "~/redux/slice/auth/AuthSlice";

const Address = () => {
  const dispatch = useDispatch();
  const { provincesList, districtList, wardList, province, district, ward } =
    useSelector((state) => state.address);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(apiGetPublicProvinces());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      setUserInfo({ ...userInfo, address: `${ward} ${district} ${province}` })
    );
  }, [dispatch, district, province, ward]);
  return (
    <div>
      <div className="field field-third">
        <select
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            dispatch(setValueProvince(selectedOption.getAttribute("name")));
            dispatch(setUserInfo({ ...userInfo, province_id: e.target.value }));
            dispatch(apiGetPublicDistrict(e.target.value));
          }}
          className="field__input"
        >
          <option value="">{`--Chọn Tỉnh/Thành phố--`}</option>
          {provincesList?.map((province, index) => {
            return (
              <option key={index} name={province.name} value={province.id}>
                {province.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="field field-third">
        <select
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            dispatch(
              setValueDistrict(`${selectedOption.getAttribute("name")},`)
            );
            dispatch(setUserInfo({ ...userInfo, district_id: e.target.value }));

            dispatch(apiGetPublicWard(e.target.value));
          }}
          className="field__input"
        >
          <option value="">{`--Chọn Quận/Huyện--`}</option>
          {districtList?.map((district, index) => {
            return (
              <option key={index} value={district.id} name={district.name}>
                {district.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="field field-third">
        <select
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            dispatch(setUserInfo({ ...userInfo, ward_id: e.target.value }));
            dispatch(setValueWard(`${selectedOption.getAttribute("name")},`));
          }}
          className="field__input"
        >
          <option value="">{`--Chọn thôn/xã--`}</option>
          {wardList?.map((ward, index) => {
            return (
              <option key={index} value={ward.id} name={ward.name}>
                {ward.name}
              </option>
            );
          })}
        </select>
      </div>

      <Field label="Địa chỉ chính xác" value={userInfo.address} />
    </div>
  );
};

export default Address;
