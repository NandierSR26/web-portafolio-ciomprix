import React, { useState } from 'react'
import { FormImage } from '../../interfaces/others'

interface InputFileProps extends Partial<HTMLInputElement> {
    image: FormImage | null;
    error: string | null;
    onChange: any;
    label: string;
}

export const InputFile = ({ image, error, onChange, name, label }: InputFileProps) => {


    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-lg font-bold">{ label }</label>

            <div
                className={`relative border-[2px] border-dashed rounded-lg border-gray-500 w-full h-40 p-5 flex flex-col items-center justify-center bg-gray-200 ${image?.file && 'bg-green-200 '}`}
            >
                <input
                    type="file"
                    name={name}
                    className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                    onChange={onChange}
                />

                {image?.file ? (
                    <>
                        <p className="text-2xl text-green-800 font-semibold">Imagen seleccionada</p>
                    </>
                ) : (
                    <>
                        <p className="text-2xl text-gray-400 font-semibold">Agrega un banner para la solución</p>
                        <p className="text-base text-gray-600 font-bold">Haz click aqui, o arrastra una imagen dentro del recuadro</p>
                    </>
                )}
            </div>

            {
                (error)
                && <span className="text-white bg-red-500 text-sm text-center py-1 rounded-md font-semibold w-full mt-1">{error}</span>
            }
        </div>
    )
}
