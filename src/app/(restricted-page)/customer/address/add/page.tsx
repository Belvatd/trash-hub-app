"use client"

import { FormInputText } from "@/components/FormInputText"
import { FormInputTextArea } from "@/components/FormInputTextArea"
import { MapsComponent } from "@/components/MapsComponent"
import { TLatLng, TParamsOnSubmit } from "@/components/MapsComponent/type"
import TextArea from "@/components/TextArea/TextArea"
import TextField from "@/components/TextField/TextField"
import { AddressSchema, TAddress } from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"

const Page = () => {
  const [isSelectMap, setIsSelectMap] = useState(false)
  const [location, setLocation] = useState<TLatLng>()
  const { register, handleSubmit, control, setValue } = useForm<TAddress>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {},
    mode: "onChange",
  })

  const handleChangeMap = (data: TParamsOnSubmit, status: boolean) => {
    setValue("addressName", data.addressName)
    setValue("fullAddress", data.addressSecondary)

    setLocation({
      lat: data.lat,
      lng: data.lng,
    })
  }

  const handleClickSelect = () => {
    setIsSelectMap(true)
  }

  const onSubmit = (data: TAddress) => {
    console.log(data)
    console.log(location)
  }

  return (
    <form
      className="flex flex-grow flex-col gap-4 border p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <MapsComponent
          containerProps={{
            className: "h-[140px] w-full",
          }}
          isGetLocationNow={false}
          onSelectMap={handleClickSelect}
          mapProps={{
            onSubmit: (data) => handleChangeMap(data, isSelectMap),
          }}
        />
      </div>

      <FormInputText
        label="Judul Alamat"
        name="addressName"
        control={control}
      />

      <TextArea placeholder="Alamat Lengkap" {...register("fullAddress")} />

      <button className="btn-success mt-auto" type="submit">
        Tambah Alamat
      </button>
    </form>
  )
}

export default Page
