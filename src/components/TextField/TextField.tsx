import { useForkRef } from "@mui/material"
import clsx from "clsx"
import { ElementType, InputHTMLAttributes, forwardRef, useRef } from "react"

type TTextFieldProps = {
  addonLeft?: ElementType
  addonRight?: ElementType
} & InputHTMLAttributes<HTMLInputElement>

// eslint-disable-next-line react/display-name
const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  (props, ref) => {
    const {
      className,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      ...rest
    } = props

    const inputRef = useRef<HTMLInputElement>()
    const handleRef = useForkRef(inputRef, ref)

    return (
      <div
        className="border-gray200 text-gray500 flex h-11 w-full gap-2 rounded-xl
        border !bg-white px-[14px] py-[10px] font-normal"
      >
        {AddonLeft && <AddonLeft />}
        <input
          className={clsx(
            "flex-grow focus:outline-none focus:placeholder:text-transparent",
            className,
          )}
          ref={handleRef}
          {...rest}
        />
        {AddonRight && <AddonRight />}
      </div>
    )
  },
)

export default TextField
