import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

type Status = 1 | 0

type TypeContent = "solution" | "category" | "content" | "company"

interface AdminCardProps {
    id: number;
    title: string;
    status: number;
    type: TypeContent
    deleteElement: (id:number) => void
}

export const AdminCard = ({ id, title, status, type, deleteElement }: AdminCardProps) => {

    const navigate = useNavigate()

    return (
        <div
            className="flex flex-col justify-between w-full flex-1 min-w-[250px] sm:max-w-md p-5 bg-white rounded-2xl shadow-xl"
        >
            <div className="flex justify-between w-full mb-16">
                <div
                    className="p-2 bg-blue-primary rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer"
                    onClick={() => navigate(`/admin/edit-${type}/${id}`)}
                >
                    <FontAwesomeIcon icon={faPencil} className="text-base text-white" />
                </div>

                <div 
                    className="p-2 bg-red-500 rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer"
                    onClick={() => deleteElement(id)}
                >
                    <FontAwesomeIcon icon={faTrash} className="text-base text-white" />
                </div>
            </div>

            <div>
                <h4 className="text-3xl font-bold text-center mb-10">{title}</h4>

                <div className="flex justify-center items-center gap-5">
                    <span className="text-lg font-bold px-3 cursor-pointer">Activar</span>
                    <span className="text-lg font-bold px-3 cursor-pointer">Desactivar</span>
                    <span className="block w-5 h-5 bg-green-500 rounded-full"></span>
                </div>
            </div>
        </div>
    )
}
