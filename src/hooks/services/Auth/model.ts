import { z } from "zod";

export const CreateUserSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  email: z.string({ required_error: "email harus diisi" }).email().nonempty({ "message": "email harus diisi" }),
  password: z.string().min(6).nonempty({ "message": "password harus diisi" }),
  address: z.string({ required_error: "alamat harus diisi" }).min(1).nonempty({ "message": "alamat harus diisi" }),
  phoneNumber: z.string({ required_error: "nomor telepon harus diisi" }).min(1).nonempty({ "message": "nomor telepon harus diisi" }),
  fullName: z.string({ required_error: "nama lengkap harus diisi" }).min(1).nonempty({ "message": "nama lengkap harus diisi" }),
  type: z.string().optional()
});

export const LoginUserSchema = z.object({
  email: z.string({ required_error: "email harus diisi" }).email().nonempty({ "message": "email harus diisi" }),
  password: z.string({ required_error: "password harus diisi" }).min(6).nonempty({ "message": "password harus diisi" }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;