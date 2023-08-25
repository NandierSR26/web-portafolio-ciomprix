import { text } from '@fortawesome/fontawesome-svg-core'
import React from 'react'

interface InputProps extends Partial<HTMLInputElement> {
    onChange: any;
    touched: any;
    errors: any;
    label: string;
}

export const Input = ({ type, name, placeholder, onChange, touched, errors, value, label, ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-1 min-w-0 mb-3">
            <label 
                className="text-lg font-bold"
                htmlFor={name}
            >
                { label }
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`bg-transparent border-[2px] border-solid border-gray-500 rounded-lg p-2 text-base font-medium w-full ${props.className}`}
            />

            {
                (errors && touched)
                && <span className="text-white bg-red-500 text-sm text-center py-1 rounded-md font-semibold w-full mt-1">{errors}</span>
            }
        </div>
    )
}
