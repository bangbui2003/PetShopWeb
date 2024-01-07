import Helmet from "../components/Helmet";
import { Container } from "@mui/material";
import ProfileView from "../sections/profile/ProfileView";

const ProfilePage = () => {
  console.log(JSON.parse(localStorage.getItem("persist:petshop/user")).token.slice(1, -1));
  return (
    <Helmet title="Profile - Petshop">
      <Container sx={{ marginTop:"100px" }}>
        <ProfileView />
      </Container>
    </Helmet>
  );
};

export default ProfilePage;