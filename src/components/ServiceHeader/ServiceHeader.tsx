"use client"

import { Box, IconButton, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "react-feather"

type TServiceHeader = {
  pageName: string
  goToPage: string
}

const ServiceHeader = (props: TServiceHeader) => {
  const { pageName, goToPage } = props
  const route = useRouter()
  return (
    <>
      <Box
        paddingX={"24px"}
        paddingY={"16px"}
        gap={"8px"}
        display="flex"
        alignItems="center"
        color="text-gray-900"
      >
        <IconButton
          className="text-gray-900"
          onClick={() => route.push(goToPage)}
        >
          <ArrowLeft />
        </IconButton>
        <Typography variant="h6">{pageName}</Typography>
      </Box>
    </>
  )
}

export default ServiceHeader
