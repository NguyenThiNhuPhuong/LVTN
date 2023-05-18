import BadgeIcon from "@mui/icons-material/Badge";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const productInputs = [
  {
    id: 1,
    name: "name",
    label: "Name",
    type: "text",
    icon: <BadgeIcon />,
  },
  {
    id: 2,
    name: "price",
    label: "Price",
    type: "text",
    icon: <PriceChangeIcon />,
  },
  {
    id: 3,
    name: "price_sale",
    label: "Price Sale",
    type: "text",
    icon: <PriceChangeIcon />,
  },
  {
    id: 4,
    name: "num",
    label: "Số lượng",
    type: "text",
    icon: <ProductionQuantityLimitsIcon />,
  },
];
export default productInputs;
