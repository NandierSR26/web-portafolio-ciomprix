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
                    <img src={logo} className="w-36" alt="logo" />
                </figure>

                <p className="flex-1 text-center text-white">
                    Todos los derechos reservados de
                    <span className="uppercase font-semibold"> {company}</span>
                </p>
            </div>
        </footer>
    )
}
