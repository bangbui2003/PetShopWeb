import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


const FormProfile = ({ user }) => {
  return (
    <Box sx={{ p: 3 }} display="flex" flexDirection="column" gap={4} component="form">
      <Box display="flex" alignItems="center" gap={5}>
        <TextField
          label="Họ"
          type="text"
          value={user?.firstName}
          sx={{ maxWidth:"200px" }}
        />
        <TextField
          label="Tên"
          type="text"
          value={user?.lastName}
          sx={{ maxWidth:"200px" }}
        />
      </Box>
      <TextField
        label="Username"
        type="text"
        value={user?.name}
        sx={{ maxWidth:"400px" }}
      />
      <TextField
        label="Email"
        type="email"
        value={user?.email}
        sx={{ maxWidth:"400px" }}
      />
      <TextField
        label="Số điện thoại"
        type="text"
        value={user?.phoneNumber}
        sx={{ maxWidth:"400px" }}
      />
      <Button variant="contained" sx={{ width:"200px" }}>Lưu thay đổi</Button>
    </Box>
  );
};

export default FormProfile;