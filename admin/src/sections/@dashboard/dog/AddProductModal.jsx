import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NumericFormat } from "react-number-format";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DogItemSchema } from "~/configs/zod.config";
import dogApi from "~/apis/modules/dog.api";
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4
};

const categories = [
  { label: "Golden Retriever", id: 1 },
  { label: "Alaska", id: 2 },
  { label: "Husky", id: 3 },
  { label: "Corgi", id: 4 },
  { label: "Doberman", id: 5 },
  { label: "Pitbull", id: 6 },
  { label: "Lạp Xưởng", id: 7 },
  { label: "Poodle", id: 8 },
  { label: "Chihuahua", id: 9 },
  { label: "Shiba", id: 10 },
  { label: "Bulldog", id: 11 },
  { label: "Beagle", id: 12 }
];

export default function AddProductModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [arr, setArr] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState([]);

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit, setValue
  } = useForm({ resolver: zodResolver(DogItemSchema) });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setListImg((prev) => [...prev, e.target.files[0]]);
    setArr([]);
    setImageUrl([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setArr([...arr, reader.result]);
          setImageUrl([...imageUrl, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleOnImageRemoveClick = (index) => {
    const filter = arr.filter((i, number) => number !== index );
    const filterList = listImg.filter((i, number) => number !== index);
    setArr(filter);
    setListImg(filterList);
  };
  const materialUITextFieldProps = {
    label: "Giá tiền",
    variant: "outlined"
  };
  // cloudinary
  const uploadFiles = async (files) => {
    if (!files) return;
    const CLOUD_NAME = "dqloxgvfj";
    const PRESET_NAME = "petshop-upload";
    const FOLDER_NAME = "PetShop_Laravel";
    const urls = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of files) {
      formData.append("file", file);
      const response = await axios.post(api, formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      if (response) {
        setIsUpload(true);
        urls.push(response.data.secure_url);
      }
    }
    return urls;
  };

  const handleUploadImg = async () => {
    const links = await uploadFiles(listImg);
    if (links.length === 0) {
      toast.error("Lỗi upload ảnh!");
    }
    setUrl(links);
    toast.success("Upload thành công!");
  };

  const handleAdd = async (dataForm) => {
    setIsLoading(true);
    const form = { ...dataForm, Images:[...url] };
    const { response, err } = await dogApi.addDog(form);
    setIsLoading(false);
    if (response) {
      setArr([]);
      setListImg([]);
      toast.success("Thêm sản phẩm thành công!");
      handleClose();
      window.location.reload();
    }
    if (err) {
      toast.error("Có lỗi khi thêm!!");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack spacing={3}>
              {/* bread */}
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Typography color="inherit" fontSize={20}>
                  Quản lý sản phẩm
                  </Typography>
                  <Typography color="text.primary" fontSize={20}>Thêm sản phẩm</Typography>
                </Breadcrumbs>
              </div>
              {/* bread */}

              {/* content */}
              {/* form */}

              <Box
                component="form"
                autoComplete="off"
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <TextField label="Tên sản phẩm" variant="outlined"
                  {
                    ...register("DogName")
                  }
                  error={touchedFields && errors?.DogName?.message !== undefined}
                  helperText={touchedFields && errors?.DogName?.message}
                  fullWidth/>

                <Box display="flex" alignItems="center" gap={2}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={categories}
                    fullWidth sx={{ flex:2 }}
                    renderInput={(params) => <TextField {...params} label="Giống"
                      {
                        ...register("DogSpecies")
                      }
                      error={touchedFields && errors?.DogSpecies?.message !== undefined}
                      helperText={touchedFields && errors?.DogSpecies?.message}
                    />}
                  />
                  <TextField label="Màu sắc" variant="outlined"
                    fullWidth sx={{ flex:2 }}
                    {
                      ...register("Color")
                    }
                    error={touchedFields && errors?.Color?.message !== undefined}
                    helperText={touchedFields && errors?.Color?.message}
                  />
                  <FormControl fullWidth sx={{ flex:1 }}>
                    <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Giới tính"
                      {
                        ...register("Sex")
                      }
                      error={touchedFields && errors?.Sex?.message !== undefined}
                      helperText={touchedFields && errors?.Sex?.message}
                    >
                      <MenuItem value="male">Đực</MenuItem>
                      <MenuItem value="female">Cái</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <NumericFormat
                    suffix={" đ"}
                    thousandSeparator
                    customInput={TextField}
                    {...materialUITextFieldProps}
                    fullWidth
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      // do something with floatValue
                      setValue("Price", floatValue);
                    }}
                    {
                      ...register("Price")
                    }
                    error={touchedFields && errors?.Price?.message !== undefined}
                    helperText={touchedFields && errors?.Price?.message}
                  />

                  <TextField label="Nguồn gốc" variant="outlined"
                    fullWidth
                    {
                      ...register("Origin")
                    }
                    error={touchedFields && errors?.Origin?.message !== undefined}
                    helperText={touchedFields && errors?.Origin?.message}
                  />
                  <TextField label="Tháng tuổi" variant="outlined"
                    sx={{ width:"400px" }}
                    {
                      ...register("Age")
                    }
                    error={touchedFields && errors?.Age?.message !== undefined}
                    helperText={touchedFields && errors?.Age?.message}
                  />
                </Box>

                <TextField label="Tình trạng sức khỏe" variant="outlined"
                  fullWidth
                  {
                    ...register("HealthStatus")
                  }
                  error={touchedFields && errors?.HealthStatus?.message !== undefined}
                  helperText={touchedFields && errors?.HealthStatus?.message}
                />
                <TextField
                  label="Mô tả"
                  multiline
                  rows={5}
                  variant="outlined"
                  {
                    ...register("Description")
                  }
                  error={touchedFields && errors?.Description?.message !== undefined}
                  helperText={touchedFields && errors?.Description?.message}
                />
              </Box>

              {/*  */}
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
                sx={{ width:"200px" }}
              >
                  Tải hình ảnh
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png , image/jpeg, image/webp"
                  multiple
                  onChange={handleFileUpload}/>
              </Button>
              {
                arr.length > 0 && <ImageList cols={4} sx={{ height: 200 }} rowHeight={150} >
                  {arr?.map((item, index) => (
                    <React.Fragment key={item}>
                      <ImageListItem >
                        <img
                          src={item}
                          alt="image-list"
                          loading="lazy"
                          style={{ objectFit:"cover" }}
                        />
                        <Button onClick={() => handleOnImageRemoveClick(index)}>Xóa</Button>
                      </ImageListItem>
                    </React.Fragment>
                  ))}
                </ImageList>
              }
              {
                arr.length > 0 && <Button sx={{ display: `${isUpload && "none"}` }}
                  onClick={handleUploadImg}
                >Xác nhận các hình ảnh</Button>
              }
              {/* content */}

              {/* action btn */}
              <Box display="flex" alignItems="center" gap={2}>
                <LoadingButton variant="contained" loading={isLoading}
                  onClick={handleSubmit(handleAdd)}
                >Thêm sản phẩm</LoadingButton>
                <Button onClick={handleClose} variant="text" sx={{ color:"error.main" }}>
                  Hủy
                </Button>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}