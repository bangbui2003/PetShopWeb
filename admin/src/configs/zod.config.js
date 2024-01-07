import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Yêu cầu là email. Ví dụ: example@gmail.com").min(1, "Yêu cầu là email. Ví dụ: example@gmail.com"),
  password: z.string()
    .min(1, "Nhập mật khẩu của bạn")
    .min(3, "Mật khẩu phải có nhiều hơn 3 ký tự")
});


export const ChangePasswordSchema = z.object({
  password: z.string().min(3, "Mật khẩu phải nhiều hơn 3 ký tự"),
  newPassword: z.string().min(3, "Mật khẩu phải nhiều hơn 3 ký tự"),
  confirmNewPassword:z.string().min(3, "Mật khẩu phải nhiều hơn 3 ký tự")
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Mật khẩu xác nhận chưa trùng khớp!",
  path: ["confirmNewPassword"] }).refine((data) => data.password !== data.newPassword, {
  message: "Mật khẩu mới phải khác mật khẩu hiện tại!",
  path: ["newPassword"]
});


export const DogItemSchema = z.object({
  DogName: z.string().min(3, "Tên sản phẩm nhiều hơn 3 ký tự"),
  DogSpecies: z.string().min(1, "Yêu cầu"),
  Price: z.coerce.number().positive(),
  Color: z.string().min(1, "Yêu cầu"),
  Sex: z.enum(["male", "female"]),
  Age: z.coerce.number().positive().int().max(200, "Số tháng quá lớn"),
  Origin: z.string().min(1, "Yêu cầu"),
  HealthStatus: z.string().min(1, "Yêu cầu"),
  Description: z.string().min(1, "Yêu cầu")
});

export const ItemSchema = z.object({
  ItemName: z.string().min(3, "Tên sản phẩm nhiều hơn 3 ký tự"),
  Category: z.string().min(1, "Yêu cầu"),
  Price: z.coerce.number().positive(),
  Quantity: z.coerce.number().positive().int().max(200, "Số tháng quá lớn"),
  Description: z.string().min(1, "Yêu cầu")
});

export const InvoiceSchema = z.object({
  name: z.string().min(1, "Yêu cầu"),
  email: z.string().email("Yêu cầu là email. Ví dụ: example@gmail.com").min(1, "Yêu cầu là email. Ví dụ: example@gmail.com"),
  phoneNumber:z.string().min(6, "Yêu cầu"),
  address: z.string().min(1, "Yêu cầu")
});

export const VoucherShema = z.object({
  code: z.string().min(1, "Yêu cầu"),
  discount_value:z.coerce.number().positive(),
  max_usage: z.coerce.number().positive().int().max(200, "Số tháng quá lớn")
});

export const BookingSchema = z.object({
  result: z.string()
});