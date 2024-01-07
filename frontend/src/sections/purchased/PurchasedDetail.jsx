import { useParams } from "react-router-dom";
import Helmet from "../../components/Helmet";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Box, Button, List, ListItemAvatar, Stack, Typography } from "@mui/material";
import { valueLabelFormat } from "../../utils/formatter";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import checkoutApi from "../../apis/modules/checkout.api";

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#2dc258 0%,#2dc258 50%,rgb(138,35,135) 100%)"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#2dc258 0%,#2dc258 50%,rgb(138,35,135) 100%)"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:"#eaeaf0",
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #2dc258 0%, #2dc258 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, #2dc258 0%, #2dc258 50%, rgb(138,35,135) 100%)"
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ReceiptIcon />,
    2: <LocalShippingIcon />,
    3: <CheckBoxIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node
};


const shipInfo = {
  address:"HCM",
  email:"dk",
  phone: 1234,
  firstName: "Duy Khanh"
};

const PurchasedDetail = () => {
  const { id } = useParams();
  const steps = ["Đang lấy hàng", "Đang giao", "Thành công"];
  const [item, setItem] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        const { response, err } = await checkoutApi.getDetail({ id });
        if (err) {
          toast.error(err);
        }
        if (response) {
          setItem(response);
          setData(JSON.parse(response.data));
        }
      } catch (error) {
        toast.error(error);
      }
    };
    get();
  }, [id]);

  return (
    <Helmet title={`purchased ${id} - petshop`}>
      <Container maxWidth="lg" sx={{ marginY: "8rem" }}>
        <Stack marginY={1} bgcolor="#fff">
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography>Mã hóa đơn: {item?.id}</Typography>
            <Box display="flex">
              {
                item?.status === "Thành công" && <Typography marginX="4px" color="green">Đơn hàng đã được giao thành công</Typography>
              }
              <Divider orientation="vertical" flexItem sx={{ marginX:1 }}/>
              <Typography textTransform="uppercase" fontWeight="bold" color="primary.price">
                {item?.status}
              </Typography>
            </Box>
          </Box>
          <Divider orientation="horizontal" />
          <Box my={5}>
            <Stepper alternativeLabel activeStep={
              item?.status === "Thành công" ? 2 : item?.status === "Đang giao" ? 1 : 0
            } connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Divider orientation="horizontal" />
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box flex={2}>

              {
                shipInfo && <Stack>
                  <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                    Thông tin người nhận
                  </Typography>
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Họ tên:" secondary={<Typography>
                    {item?.name}
                  </Typography>}
                  />
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Địa chỉ:" secondary={<Typography>
                    {item?.address}
                  </Typography>}
                  />
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Số điện thoại:" secondary={<Typography>
                    {item?.phoneNumber}
                  </Typography>}
                  />
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Email:" secondary={<Typography>
                    {item?.email}
                  </Typography>}
                  />
                </Stack>
              }

            </Box>
            <Timeline sx={{ flex:1 }}>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item?.created_at !== item?.updated_at && item && new Date(item?.updated_at).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item?.status === "Thành công" ? "success" : "grey"} >
                    <LocalShippingIcon fontSize="small"/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m:"auto 0" }}>Giao thành công</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item?.created_at !== item?.updated_at && item && new Date(item?.updated_at).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item?.created_at !== item?.updated_at ? "success" : "grey"} >
                    <LocalShippingIcon fontSize="small"/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m:"auto 0" }}>Đang giao hàng</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item && new Date(item?.created_at).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success" >
                    <TaskAltIcon fontSize="small"/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m:"auto 0" }}>Đang lấy hàng</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item && new Date(item?.created_at).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot sx={{ m: "auto 0" }} color="success">
                    <TaskAltIcon fontSize="small"/>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ m: "auto 0" }}>Đặt đơn hàng thành công</TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
          <Divider orientation="horizontal" />
          <List>
            {
              data?.map(item =>
                <ListItem sx={{ gap:2 }} key={item.Name}>
                  <ListItemAvatar>
                    <img src={item?.Images[0]} alt="img-order"
                      height="100px" width="100px" style={{ objectFit:"cover" }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item?.Name}
                  />
                  <Typography variant="subtitle1">
                    {item?.Quantity} x {" "}
                    {valueLabelFormat(item?.Price)}
                  </Typography>
                </ListItem>
              )
            }
          </List>
          <Box display="flex" alignItems="end" p={2} flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Thành tiền:</Typography>
              <Typography component="p" color="primary.price" fontWeight="bold">
                {valueLabelFormat(item?.total)}
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ color:"#333" }}>Liên hệ người bán</Button>
          </Box>
        </Stack>
      </Container>
    </Helmet>
  );
};

export default PurchasedDetail;