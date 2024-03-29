import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "~/redux/slice/address/AddressSlice";
import { setNewOrder } from "~/redux/slice/order/OrderSlice";
import Field from "../Field/Field";

const Address = () => {
  const dispatch = useDispatch();
  const { provincesList, districtList, wardList } = useSelector(
    (state) => state.address
  );
  const { orderNew } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(
      apiGetPublicProvinces(
        orderNew.province_id !== undefined ? orderNew.province_id : ""
      )
    );
  }, [dispatch, orderNew.province_id]);

  return (
    <div>
      <div className="field field-third">
        <select
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const provinceId = e.target.value;
            const provinceName = selectedOption.getAttribute("name");
            dispatch(
              setNewOrder({
                ...orderNew,
                province_id: provinceId,
                province_name: provinceName,
                district_name: "",
                ward_name: "",
              })
            );
            dispatch(apiGetPublicDistrict(orderNew.province_id));
          }}
          className="field__input"
          value={orderNew.province_Id}
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
              setNewOrder({
                ...orderNew,
                district_id: districtId,
                district_name: districtName,
                ward_name: "",
              })
            );
            dispatch(apiGetPublicWard(orderNew.district_id));
          }}
          className="field__input"
          value={orderNew.district_id}
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
              setNewOrder({ ...orderNew, ward_id: wardId, ward_name: wardName })
            );
          }}
          className="field__input"
          value={orderNew.ward_id}
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
        value={`${orderNew.ward_name !== undefined ? orderNew.ward_name : ""} ${
          orderNew.district_name !== undefined ? orderNew.district_name : ""
        } ${
          orderNew.province_name !== undefined ? orderNew.province_name : ""
        }`}
      />
    </div>
  );
};

export default Address;
