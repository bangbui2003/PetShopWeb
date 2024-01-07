// import { useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import ProductCard from "./ProductCard";
import ProductSort from "./ProductSort";
// import ProductFilters from "./ProductFilters";

// ----------------------------------------------------------------------

export default function ProductsView({ products }) {
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <Container>
      {/* <Typography variant="h4" sx={{ mb: 5,
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: `${24 / 16}rem`
      }}>
        Sản phẩm cho chó
      </Typography> */}
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        {/* <Box
          sx={{
            width: 450,
            maxWidth: "100%"
          }}
        >
          <TextField fullWidth label="Tìm kiếm" id="search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box> */}
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          {/* <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          /> */}
          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}