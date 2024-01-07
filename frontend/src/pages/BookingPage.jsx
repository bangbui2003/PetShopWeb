import { Container } from "@mui/material";
import Helmet from "../components/Helmet";
import BookingView from "../sections/booking/BookingView";

const BookingPage = () => {
  return (
    <Helmet title="Booking - PetShop">
      <Container sx={{ marginY: "5rem" }}>
        <BookingView />
      </Container>
    </Helmet>
  );
};

export default BookingPage;