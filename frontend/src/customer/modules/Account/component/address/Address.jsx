import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Field from "~/customer/modules/Payment/component/Field/Field";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "~/redux/slice/address/AddressSlice";
import { setUpdateUser } from "~/redux/slice/user/UserSlice";

const Address = () => {
  const dispatch = useDispatch();
  const { provincesList, districtList, wardList } = useSelector(
    (state) => state.address
  );
  const { userProfile } = useSelector((state) => state.user);
  console.log(userProfile);
  useEffect(() => {
    dispatch(
      apiGetPublicProvinces(
        userProfile.province_id !== null ? userProfile.province_id : 1
      )
    );
  }, [dispatch, userProfile.province_id]);

  return (
    <div>
      <div className="field field-third">
        <select
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const provinceId = e.target.value;
            const provinceName = selectedOption.getAttribute("name");
            console.log(provinceId);
            dispatch(
              setUpdateUser({
                ...userProfile,
                province_id: provinceId,
                province_name: provinceName,
                district_name: "",
                ward_name: "",
              })
            );

            dispatch(
              apiGetPublicDistrict(
                provinceId
                  ? provinceId
                  : userProfile.province_id
                  ? userProfile.province_id
                  : ""
              )
            );
          }}
          className="field__input"
          value={userProfile.province_Id}
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

            dispatch(
              setUpdateUser({
                ...userProfile,
                district_id: districtId,
                district_name: districtName,
                ward_name: "",
              })
            );
            dispatch(
              apiGetPublicWard(
                districtId
                  ? districtId
                  : userProfile.district_id
                  ? userProfile.district_id
                  : ""
              )
            );
          }}
          className="field__input"
          value={userProfile.district_id}
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
            dispatch(
              setUpdateUser({
                ...userProfile,
                ward_id: wardId,
                ward_name: wardName,
              })
            );
          }}
          className="field__input"
          value={userProfile.ward_id}
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
      <Field
        label="Địa chỉ"
        value={`${
          userProfile.ward_name !== undefined ? userProfile.ward_name : ""
        } ${
          userProfile.district_name !== undefined
            ? userProfile.district_name
            : ""
        } ${
          userProfile.province_name !== undefined
            ? userProfile.province_name
            : ""
        }`}
      />
    </div>
  );
};

export default Address;
