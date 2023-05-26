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
  const { userProfile } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(apiGetPublicProvinces());
  }, [dispatch]);

  return (
    <div>
      <div className="field field-third">
        <select
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const provinceId = e.target.value;
            const provinceName = selectedOption.getAttribute("name");
            dispatch(setValueProvince(provinceName));
            dispatch(setUserInfo({ ...userInfo, province_id: provinceId }));
            dispatch(
              apiGetPublicDistrict(
                provinceId ? provinceId : userInfo.province_id
              )
            );
            dispatch(setValueDistrict(""));
            dispatch(setValueWard(""));
          }}
          className="field__input"
          value={
            userInfo.province_id ? userInfo.province_id : userInfo.province_id
          }
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
            const districtId = e.target.value;
            const districtName = selectedOption.getAttribute("name");
            dispatch(setValueDistrict(`${districtName},`));
            dispatch(setUserInfo({ ...userInfo, district_id: districtId }));
            dispatch(apiGetPublicWard(districtId));
            dispatch(setValueWard(""));
          }}
          className="field__input"
          value={
            userInfo.district_id ? userInfo.district_id : userInfo.district_id
          }
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
            const wardId = e.target.value;
            const wardName = selectedOption.getAttribute("name");
            dispatch(setUserInfo({ ...userInfo, ward_id: wardId }));
            dispatch(setValueWard(`${wardName},`));
          }}
          className="field__input"
          value={userInfo.ward_id ? userInfo.ward_id : userProfile.district_id}
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
      <Field label="Địa chỉ" value={`${ward}${district}${province}`} />
    </div>
  );
};

export default Address;
