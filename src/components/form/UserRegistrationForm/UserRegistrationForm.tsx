"use client";

import { FormInputText } from "@/components/FormInputText";
import { TypeAccount } from "@/constants/type";
import {
  CreateUserSchema,
  CreateUserType,
  useCreateUser,
} from "@/hooks/services/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

type TRegistrationFormProps = {
  type: TypeAccount;
};

const UserRegistrationForm = ({ type }: TRegistrationFormProps) => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      password: "",
      type: type,
      fullName: "",
      email: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useCreateUser({
    onSuccess(data) {
      if (!data.user.emailVerified) {
        router.push("/email-action?action=verifyEmail");
      }
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
        fullName: data?.fullName,
      };
      mutate(payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="h-[100vh] pt-[50%]"
      style={{ backgroundImage: "url(https://i.ibb.co/3c0P6T7/Bg.png)" }}
    >
      <Box className="z-100 m-2 h-[500px] bg-white rounded-[16px] p-4">
        <Stack
          justifyContent="space-between"
          alignItems="left"
          spacing={"20px"}
        >
          <div>
            <p className="text-xl font-semibold mb-2">
              Daftar{" "}
              {`${type.charAt(0).toUpperCase()}${type.toLowerCase().slice(1)}`}
            </p>
            <p className="font-normal text-sm text-gray-500">
              Silakan isi data dibawah.
            </p>
          </div>
          <form
            className="flex flex-col gap-5 w-96"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormInputText name={"fullName"} control={control} label={"Nama"} />
            <FormInputText name={"email"} control={control} label={"Email"} />
            <FormInputText
              type="password"
              name={"password"}
              control={control}
              label={"Kata Sandi"}
            />
            <button
              className="bg-[#309C7A] rounded-[12px] py-[10px] px-[18px] text-white font-semibold"
              type="submit"
            >
              {isPending ? <PulseLoader color="white" size={10} /> : "Daftar"}
            </button>
            <p className="text-center font-medium text-sm text-gray-500">
              Sudah punya akun?
              <a className="font-semibold text-sm text-[#309C7A] decoration-0" href="/login"> Masuk</a>
            </p>
          </form>
        </Stack>
      </Box>
    </div>
  );
};

export default UserRegistrationForm;
