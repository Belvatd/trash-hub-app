import { z } from "zod"

export const CreateUserSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  email: z
    .string({ required_error: "email harus diisi" })
    .email()
    .nonempty({ message: "email harus diisi" }),
  password: z.string().min(6).nonempty({ message: "password harus diisi" }),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  fullName: z
    .string({ required_error: "nama lengkap harus diisi" })
    .min(1)
    .nonempty({ message: "nama lengkap harus diisi" }),
  type: z.string().optional(),
})

export const LoginUserSchema = z.object({
  email: z
    .string({ required_error: "email harus diisi" })
    .email({ message: "Masukan format email yang benar" })
    .nonempty({ message: "email harus diisi" }),
  password: z
    .string({ required_error: "password harus diisi" })
    .min(6)
    .nonempty({ message: "password harus diisi" }),
})

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6).nonempty({ message: "password harus diisi" }),
    confirmPassword: z
      .string()
      .min(6)
      .nonempty({ message: "password harus diisi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords tidak sesuai",
    path: ["confirmPassword"],
  })

export type CreateUserType = z.infer<typeof CreateUserSchema>
export type LoginUserType = z.infer<typeof LoginUserSchema>
export type TResetPassword = z.infer<typeof ResetPasswordSchema>
