import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { valueLabelFormat } from "../utils/formatter";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/features/cartSlice";
import { toast } from "react-toastify";

const AnimalItem = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  function findProductByIdAndType(productsArray, id, type) {
    return productsArray.find(product => product.id === +id && product.type === type);
  }

  const addToCart = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này!");
    }
    else {
      const exist = findProductByIdAndType(cartItems, item.id, "animal");
      if (exist) {
        toast.error("Sản phẩm đã có trong giỏ hàng");
        return;
      }
      dispatch(addItem({
        id: item?.id,
        Quantity: 1,
        Price: item?.Price,
        Images: item?.Images,
        DogName: item?.DogName,
        type: "animal"
      }));
      toast.success("Thêm vào giỏ hàng thành công!");
    }

  };

  return (
    <Box component={Link} to={`${item?.id}`} sx={{ textDecoration:"none" }}>
      <Card sx={{ maxWidth: 320, cursor: "pointer" }}
      >
        <CardMedia
          image={item?.Images[0]}
          title={item?.DogName}
          sx={{
            height: "320px",
            width:"100%",
            objectFit:"cover"
          }}
        />
        <CardContent >
          <Typography gutterBottom variant="h6" component="div" textTransform="capitalize"
            textAlign="center"
            fontWeight="bold"
            fontSize="16px"
            sx={{
              overflow:"hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1"
            }}
          >
            {item?.DogName} {item?.id}
          </Typography>
          <Typography gutterBottom variant="h6" color="primary.price"
            textAlign="center"
          >
            {valueLabelFormat(item?.Price)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent:"center" }}>
          {
            item?.IsInStock ? <Button
              variant="contained"
              size="medium"
              onClick={addToCart}
            >
                Thêm vào giỏ hàng
            </Button> : <Button variant="contained"
              size="medium">
                Liên hệ
            </Button>
          }
        </CardActions>
      </Card>
    </Box>
  );
};

export default AnimalItem;