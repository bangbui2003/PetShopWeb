import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "../redux/features/appStateSlice";
import Helmet from "../components/Helmet";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TableCart from "../components/TableCart";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { valueLabelFormat } from "../utils/formatter";
import { useNavigate } from "react-router-dom";
import voucherApi from "../apis/modules/voucher.api";
import { toast } from "react-toastify";
import { setTotalAmount } from "../redux/features/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalAmount, cartItems } = useSelector(state => state.cart);
  useEffect( () => {
    dispatch(setAppState(""));
  }, [dispatch]);

  const [voucher, setVoucher] = useState("");

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ marginTop:"100px", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Typography>Hiện không có sản phẩm nào trong giỏ hàng</Typography>
      </Container>
    );
  }
  // const handleQtyChange = (item, value) => {
  //   // TODO: find item in cartItems
  //   const exist = cartItems?.find(i => i.id && i.type === "product");
  //   // TODO: changeQuantity
  //   if (exist) {
  //     exist.Quantity = value;
  //   }
  //   // TODO: reset new cartItem
  //   dispatch(addItem(exist));
  // };

  const handlePromotion = async () => {
    const { response, err } = await voucherApi.getVoucher({ code: voucher });
    if (err) {
      toast.error("Mã voucher không hợp lệ");
      return;
    }


    if (response.error) {
      toast.error(response.error);
    }

    if (response && response.discount_value)
    {
      toast.success(`Áp dụng voucher thành công, giảm ${valueLabelFormat(response?.discount_value)}`);
      dispatch(setTotalAmount(response.discount_value));
    }
  };

  return (
    <Helmet title="Giỏ hàng">
      <Container maxWidth="xl" sx={{ marginTop:"5rem" }}>
        <Stack direction={{ xs:"column", md:"row" }}paddingX={5} spacing={1}>
          <Box flex={2}>
            <TableCart cartItems={cartItems} />
          </Box>
          <Box flex={1.2}>
            <Stack direction="column" sx={{
              borderLeft:"10px solid #ececec",
              padding:"20px",
              bgcolor:"#fff" }}
            spacing={3}
            >
              <Typography fontWeight="bold" fontSize="18px"
                textTransform="uppercase"
                paddingTop="20px">Cộng giỏ hàng</Typography>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography>Tạm tính</Typography>
                <Typography color="primary.price">{valueLabelFormat(totalAmount)}</Typography>
              </Stack>
              <Divider/>
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography sx={{ flex:1 }}>Mã giảm giá</Typography>
                <TextField sx={{ flex: 2 }} onChange={(e) => setVoucher(e.target.value)}
                  value={voucher}/>
                <Button variant="contained" sx={{ width:"100px" }}
                  onClick={handlePromotion}
                >Áp dụng</Button>
              </Stack>
              <Divider/>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Tổng</Typography>
                <Typography color="primary.price">{valueLabelFormat(totalAmount)}</Typography>
              </Stack>
              <Button variant="contained" fullWidth
                onClick={() => navigate("/order")}
              >Tiến hành thanh toán</Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Helmet>
  );
};

export default CartPage;