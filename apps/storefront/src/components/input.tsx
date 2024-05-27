import * as React from "react"


export type InputProps =  React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (

      <input
        type={type}
        className=
          "block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
