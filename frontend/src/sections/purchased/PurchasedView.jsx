import { Stack, Typography } from "@mui/material";
import ListPurchased from "./ListPurchased";
import { useSelector } from "react-redux";


const PurchasedView = () => {
  const { user } = useSelector(state => state.user);

  return (
    <Stack gap={2}>
      <Typography textTransform="uppercase" fontWeight={800} fontSize="1.2remx">
        Lịch sử mua hàng</Typography>
      <ListPurchased user={user}/>
    </Stack>
  );
};

export default PurchasedView;