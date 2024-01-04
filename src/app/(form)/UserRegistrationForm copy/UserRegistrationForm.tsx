"use client";

import { TypeAccount } from "@/constants/type";
import {
  CreateUserSchema,
  CreateUserType,
  useCreateUser,
} from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";

type TRegistrationFormProps = {
  type: TypeAccount;
};

const UserRegistrationForm = ({ type }: TRegistrationFormProps) => {
  const {register, handleSubmit} = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const { mutate } = useCreateUser({
    onSuccess(data) {
      console.log(data);
    },
    onError(err: any) {
      console.log("error:", err);
    },
  });

  const onError = (error: FieldErrors<CreateUserType>) => {
    console.log(error);
    return error;
  };

  const onSubmit = async (data: CreateUserType) => {
    try {
      const payload = {
        email: data?.email,
        password: data?.password,
        type: type,
        address: data?.address,
        fullName: data?.fullName,
        phoneNumber: data?.fullName,
      };
      mutate(payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 w-96"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input placeholder="fullName" {...register("fullName")} />
        <input placeholder="email" type="email" {...register("email")} />
        <input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <input placeholder="address" {...register("address")} />
        <input placeholder="nomor telepon" {...register("phoneNumber")} />
        <button className="bg-slate-300" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
