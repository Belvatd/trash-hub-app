import { useForkRef } from "@mui/material"
import clsx from "clsx"
import {
  ChangeEventHandler,
  ElementType,
  LegacyRef,
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
} from "react"

export type TTextAreaProps = {
  addonLeft?: ElementType
  addonRight?: ElementType
  label?: string
  disabled?: boolean
  isError?: boolean
  caption?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

// eslint-disable-next-line react/display-name
const TextArea = forwardRef<HTMLInputElement, TTextAreaProps>((props, ref) => {
  const {
    className,
    addonLeft: AddonLeft,
    addonRight: AddonRight,
    label,
    disabled,
    isError,
    caption,
    onChange,
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
          "flex h-11 w-full gap-2 font-normal",
          disabled && "bg-gray-50",
          isError && "!border-error300",
        )}
      >
        {AddonLeft && <AddonLeft />}
        <textarea
          className={clsx(
            "flex-grow rounded-xl border border-gray-200 bg-white px-[14px] py-[10px]  text-gray-500 focus:text-gray-900 focus:outline-none focus:placeholder:text-transparent disabled:bg-gray-50",
            className,
          )}
          // ref={handleRef as LegacyRef<HTMLTextAreaElement>}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        {AddonRight && <AddonRight />}
      </div>
      {caption && (
        <div
          className={clsx(
            "ml-1 mt-[6px] text-sm",
            isError ? "text-error500" : "text-gray-500",
          )}
        >
          {caption}
        </div>
      )}
    </div>
  )
})

export default TextArea
