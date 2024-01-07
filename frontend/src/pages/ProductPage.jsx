import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Helmet from "../components/Helmet";
import SectionBanner from "../components/SectionBanner";
import itemApi from "../apis/modules/item.api";
import { toast } from "react-toastify";
import ProductView from "../sections/products/ProductView";
import { filter } from "lodash";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user?.ItemName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterName, setFilterName] = useState("");

  const getAllItems = async () => {
    setIsLoading(true);
    try {
      const { response, err } = await itemApi.getAllItems();
      if (response) {
        setData(response.data);
      }
      if (err) {
        toast.error(err);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(data, getComparator(), filterName);

  const isNotFound = !filteredUsers?.length && !!filterName;

  return (
    <Helmet title="Đồ cho chó">
      <SectionBanner title={"Đồ cho chó"}/>
      <Container maxWidth="xl" sx={{ marginY:"5rem" }}>
        <Container
          maxWidth="lg"
        >
          <Box
            sx={{
              // width: 450,
              display:"flex",
              alignItems:"center"
              // maxWidth: "100%"
            }}
          >
            <Typography variant="h4" sx={{ mb: 5,
              fontWeight: 700,
              lineHeight: 1.5,
              fontSize: `${24 / 16}rem`,
              flex:2
            }}>
            Sản phẩm cho chó
            </Typography>
            <TextField fullWidth label="Tìm kiếm" id="search" sx={{ flex:1 }}
              value={filterName}
              onChange={handleFilterByName}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          {isNotFound && (
            <>
              <Typography variant="h6" paragraph>
                    Not found
              </Typography>

              <Typography variant="body2">
                    No results found for &nbsp;
                <strong>&quot;{filterName}&quot;</strong>.
                <br /> Try checking for typos or using complete words.
              </Typography>

            </>
          )}
        </Container>
        {
          isLoading && <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        }
        {
          data && <ProductView products={filteredUsers} />
        }

      </Container>
    </Helmet>
  );
};

export default ProductPage;