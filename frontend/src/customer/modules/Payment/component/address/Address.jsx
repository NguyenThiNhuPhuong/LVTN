import { useEffect, useState } from "react";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "~/services/addressService";
import Field from "../Field/Field";
import Select from "../Select/Select";

const Address = ({ setPayload }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);
  useEffect(() => {
    setWard(null);
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(district);
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };

    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setWards([]);
  }, [district]);
  //   useEffect(() => {
  //     setPayload((prev) => ({
  //       ...prev,
  //       address: `${
  //         district
  //           ? `${
  //               districts?.find((item) => item.district_id === district)
  //                 ?.district_name
  //             },`
  //           : ""
  //       } ${
  //         province
  //           ? provinces?.find((item) => item.province_id === province)
  //               ?.province_name
  //           : ""
  //       }`,
  //       province: province
  //         ? provinces?.find((item) => item.province_id === province)
  //             ?.province_name
  //         : "",
  //     }));
  //   }, [province, district]);
  return (
    <div>
      <Select
        type="province"
        value={province}
        setValue={setProvince}
        options={provinces}
        label="Tỉnh/Thành phố"
      />
      <Select
        reset={reset}
        type="district"
        value={district}
        setValue={setDistrict}
        options={districts}
        label="Quận/Huyện"
      />
      <Select
        reset={reset}
        type="ward"
        value={ward}
        setValue={setWard}
        options={wards}
        label="Xã"
      />
      <Field
        label="Địa chỉ chính xác"
        value={`${
          ward
            ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
            : ""
        }${
          district
            ? `${
                districts?.find((item) => item.district_id === district)
                  ?.district_name
              },`
            : ""
        }${
          province
            ? provinces?.find((item) => item.province_id === province)
                ?.province_name
            : ""
        }`}
      />
    </div>
  );
};

export default Address;
