import { useForkRef } from "@mui/material"
import clsx from "clsx"
import { ElementType, InputHTMLAttributes, forwardRef, useRef } from "react"

type TTextFieldProps = {
  addonLeft?: ElementType
  addonRight?: ElementType
  label?: string
  disabled?: boolean
  isError?: boolean
} & InputHTMLAttributes<HTMLInputElement>

// eslint-disable-next-line react/display-name
const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  (props, ref) => {
    const {
      className,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      label,
      disabled,
      isError,
      ...rest
    } = props

    const inputRef = useRef<HTMLInputElement>()
    const handleRef = useForkRef(inputRef, ref)

    return (
      <div>
        {label && (
          <div className="text-gray700 mb-[6px] text-sm font-medium">
            {label}
          </div>
        )}
        <div
          className={clsx(
            "border-gray200 flex h-11 w-full gap-2 rounded-xl border  bg-white px-[14px] py-[10px] font-normal",
            disabled && "bg-gray50",
            isError && "border-error300",
          )}
        >
          {AddonLeft && <AddonLeft />}
          <input
            className={clsx(
              "text-gray500 disabled:bg-gray50 flex-grow focus:text-gray-900 focus:outline-none focus:placeholder:text-transparent",
              className,
            )}
            ref={handleRef}
            disabled={disabled}
            {...rest}
          />
          {AddonRight && <AddonRight />}
        </div>
      </div>
    )
  },
)

export default TextField
