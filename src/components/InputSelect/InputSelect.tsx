import React, { FC, useEffect, useRef, useState } from 'react'
import arrowSelect from '../../../assets/arrow-select.svg'
import styles from './InputSelect.module.scss'

type Field = 'sectors' | 'nationality' | 'state' | 'city' | 'education_level' | 'default'

export interface IOptionSelect {
    value: string | number;
    text: string;
}

interface Props {
    options: IOptionSelect[];
    label?: string
    name: string
    onChange: any
    value: any
    touched?: any
    errors?: any
    className?: string
    default_option?: string
}


export const InputSelect: FC<Props> = ({ label, name, onChange, value, touched, errors, className, options, default_option }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const selectRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-col items-start justify-start w-full ${className && className}`}>
            {
                label && <label
                    htmlFor={name}
                    className="text-[15px] text-[#5C5C5C] font-light px-1 mb-[2px]"
                >
                    {label}
                </label>
            }

            <div className="flex items-center bg-[#D2D2D2] justify-start w-full bg-grey-200 h-[46px] rounded-3xl pr-3 mb-[2px]">
                <select
                    className={`${styles.input__select} flex-1 h-[46px] text-sm text-grey-700 font-medium py-2 px-3 rounded-3xl outline-none bg-inherit min-w-0 cursor-pointer`}
                    name={name}
                    onChange={onChange}
                    value={value}
                    ref={selectRef}
                    onClick={handleSelectClick}
                >
                    <option value={''}>{default_option ? default_option : 'seleccionar'}</option>
                    {
                        options && options.map((option: IOptionSelect) => (
                            <option
                                key={option.text}
                                value={option.value}
                            >
                                {option.text}
                            </option>
                        ))

                    }
                </select>
                <picture>
                    <i className={`fa-solid fa-caret-down transition-all ${isOpen ? styles.select_is_open : ""}`}></i>
                </picture>
            </div>
            {
                (errors && touched)
                && <span className="text-white bg-pink-500 text-sm text-center py-1 rounded-3xl font-semibold w-full mt-1">{errors}</span>
            }
        </div>
    )
}
