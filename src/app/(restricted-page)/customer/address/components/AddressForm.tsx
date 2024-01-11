"use client"

import { useAuth } from "@/app/(restricted-page)/AuthProvider"
import { FormInputText } from "@/components/FormInputText"
import { MapsComponent } from "@/components/MapsComponent"
import { TLatLng, TParamsOnSubmit } from "@/components/MapsComponent/type"
import TextArea from "@/components/TextArea/TextArea"
import {
  AddressSchema,
  TAddress,
  useAddAddressUser,
  useEditCurrentAddress,
} from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { TAddressItem } from "../edit/page"

type TAddressFormProps = {
  address?: TAddressItem
  isEdit?: boolean
  indexEdit?: string | null
}

const AddressForm = ({ address, isEdit, indexEdit }: TAddressFormProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [location, setLocation] = useState<TLatLng>()
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, control, setValue } = useForm<TAddress>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {},
    mode: "onChange",
  })
  const { mutate: addAddress, isPending: loadingAdd } = useAddAddressUser({
    onSuccess() {
      return router.push("/customer/address")
    },
  })

  const { mutate: editAddress, isPending: loadingEdit } = useEditCurrentAddress(
    {
      onSuccess() {
        return router.push("/customer/address")
      },
    },
  )

  const handleChangeMap = (data: TParamsOnSubmit) => {
    setValue("fullAddress", data.addressSecondary)
    setLocation({
      lat: data.lat,
      lng: data.lng,
    })
  }

  const onSubmit = (data: TAddress) => {
    if (data && user && !isEdit) {
      addAddress({
        userId: user?.uid,
        address: {
          addressName: data.addressName,
          fullAddress: data.fullAddress,
          pinpoint: {
            _lat: location?.lat ?? 0,
            _long: location?.lng ?? 0,
          },
        },
      })
    }

    if (data && isEdit && user) {
      editAddress({
        userId: user?.uid,
        address: {
          addressName: data.addressName,
          fullAddress: data.fullAddress,
          pinpoint: {
            _lat: location?.lat ?? 0,
            _long: location?.lng ?? 0,
          },
        },
        idx: parseInt(indexEdit || "0"),
      })
    }
  }

  const renderMaps = () => {
    if (isEdit) {
      return (
        <MapsComponent
          containerProps={{
            className: "h-[140px] w-full",
          }}
          customPinpoint={location}
          mapProps={{
            onSubmit: handleChangeMap,
          }}
        />
      )
    }

    return (
      <MapsComponent
        containerProps={{
          className: "h-[140px] w-full",
        }}
        isGetLocationNow={false}
        mapProps={{
          onSubmit: handleChangeMap,
        }}
      />
    )
  }

  useEffect(() => {
    if (address) {
      setDisabled(true)
      setLocation({
        lat: address.pinpoint._lat,
        lng: address.pinpoint._long,
      })

      setValue("addressName", address.addressName)

      setTimeout(() => {
        setValue("fullAddress", address.fullAddress)
        setDisabled(false)
      }, 1500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const isPending = loadingAdd || loadingEdit

  return (
    <form
      className="flex flex-grow flex-col gap-4 border p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative overflow-hidden rounded-lg">{renderMaps()}</div>

      <FormInputText
        label="Judul Alamat"
        name="addressName"
        control={control}
      />

      <TextArea
        placeholder="Alamat Lengkap"
        {...register("fullAddress")}
        disabled={disabled}
      />

      <button
        className="btn-success mt-auto flex"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <ClipLoader size={16} color="#309C7A" /> : "Simpan"}
      </button>
    </form>
  )
}

export default AddressForm
