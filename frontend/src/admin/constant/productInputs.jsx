import BadgeIcon from "@mui/icons-material/Badge";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const productInputs = [
  {
    id: 1,
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Apple Macbook Pro",
    err: "hãy nhập tên sản phẩm",
    pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
    require: true,
    icon: <BadgeIcon />,
  },
  {
    id: 2,
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Computers",
    pattern: "^[0-9]$",
    err: "hãy nhập giá bán",
    require: true,
    icon: <PriceChangeIcon />,
  },
  {
    id: 3,
    name: "price_sale",
    label: "Price Sale",
    type: "number",
    placeholder: "Computers",
    pattern: "^[0-9]$",
    err: "hãy nhập giá bán",
    require: true,
    icon: <PriceChangeIcon />,
  },
  {
    id: 4,
    name: "num",
    label: "Số lượng",
    type: "text",
    placeholder: "xanh ,đỏ,vàng",
    err: "hãy nhập màu",
    require: true,
    icon: <ProductionQuantityLimitsIcon />,
  },
];
export default productInputs;
