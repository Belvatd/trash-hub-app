import { useForkRef } from "@mui/material"
import clsx from "clsx"
import {
  ChangeEventHandler,
  ElementType,
  HTMLProps,
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
const TextArea = forwardRef<HTMLTextAreaElement, TTextAreaProps>(
  (props, ref) => {
    const {
      className,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      label,
      disabled,
      isError,
      caption,
      maxLength,
      value,
      ...rest
    } = props

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const handleRef = useForkRef(inputRef, ref)

    return (
      <div>
        {label && (
          <div className="mb-[6px] text-sm font-medium text-gray-700">
            {label}
          </div>
        )}
        <textarea
          {...rest}
          maxLength={maxLength}
          ref={handleRef}
          className={clsx(
            "h-[120px] w-full gap-2 rounded-xl border border-gray-200 bg-white px-[14px] py-[10px] font-normal",
            "text-gray-500 focus:text-gray-900 focus:outline-none focus:placeholder:text-transparent disabled:bg-gray-50",
            isError && "!border-error-300",
            className,
          )}
          disabled={disabled}
          value={value?.toString()}
        />
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

export default TextArea
