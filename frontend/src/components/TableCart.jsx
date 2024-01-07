import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { valueLabelFormat } from "../utils/formatter";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import QuanityInput from "./quantity/QuantityInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../redux/features/cartSlice";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));


const TableCart = ({ cartItems }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sản phẩm</StyledTableCell>
            <StyledTableCell align="right">Giá</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="right">Tạm tính</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems?.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                <Card sx={{ display: "flex", bgcolor:"inherit", boxShadow:"none" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80, height:80 }}
                    image={item?.Images[0]}
                    alt="image"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item?.Name}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </StyledTableCell>
              <StyledTableCell align="right">{valueLabelFormat(item?.Price)}</StyledTableCell>
              <StyledTableCell align="center"><QuanityInput max={item?.stock || item?.Quantity} qty={item?.Quantity} setQty={setQty}/></StyledTableCell>
              <StyledTableCell align="right">{valueLabelFormat(item?.Price*item?.Quantity)}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton>
                  <ClearIcon onClick={() => dispatch(deleteItem({ id:item.id, type: item.type }))}/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableCart;