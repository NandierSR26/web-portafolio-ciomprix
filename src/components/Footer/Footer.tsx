import React from 'react'

interface FooterProps {
    logo: string;
    company: string;
}

export const Footer = ({ logo, company }: FooterProps) => {

    return (
        <footer className="w-full bg-[#333333]">
            <div className="flex items-center gap-5 px-7 md:px-28 max-w-[1800px] mx-auto py-5">
                <figure>
                    <img src={`${import.meta.env.VITE_API_URL_DEVELOPMENT}/${logo}`} className="w-[160px] h-[40px] md:w-[250px] md:h-[50px]" alt="logo" />
                </figure>

                <p className="flex-1 text-end text-white">
                    Todos los derechos reservados de
                    <span className="uppercase font-semibold"> {company}</span>
                </p>
            </div>
        </footer>
    )
}
