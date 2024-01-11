import { useForkRef } from "@mui/material"
import clsx from "clsx"
import { ElementType, InputHTMLAttributes, forwardRef, useRef } from "react"

export type TTextFieldProps = {
  addonLeft?: ElementType
  addonRight?: ElementType
  label?: string
  disabled?: boolean
  isError?: boolean
  caption?: string
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
      caption,
      ...rest
    } = props

    const inputRef = useRef<HTMLInputElement>()
    const handleRef = useForkRef(inputRef, ref)

    return (
      <div>
        {label && (
          <div className="mb-[6px] text-sm font-medium text-gray-700">
            {label}
          </div>
        )}
        <div
          className={clsx(
            "flex h-11 w-full gap-2 rounded-xl border border-gray-200 bg-white px-[14px] py-[10px] font-normal",
            disabled && "bg-gray-50",
            isError && "!border-error300",
          )}
        >
          {AddonLeft && <AddonLeft />}
          <input
            className={clsx(
              "flex-grow text-gray-500 focus:text-gray-900 focus:outline-none focus:placeholder:text-transparent disabled:bg-gray-50",
              className,
            )}
            ref={handleRef}
            disabled={disabled}
            {...rest}
          />
          {AddonRight && <AddonRight />}
        </div>
        {caption && (
          <div
            className={clsx(
              "ml-1 mt-[6px] text-sm",
              isError ? "text-error-500" : "text-gray-500",
            )}
          >
            {caption}
          </div>
        )}
      </div>
    )
  },
)

export default TextField
