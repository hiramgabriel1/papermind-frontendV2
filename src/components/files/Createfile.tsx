import React from 'react'
interface createfileProps {
    onClose: () => void;
}



export default function Createfile({onClose}: createfileProps) {
  return (
    <div>
        <div className='flex h-screen w-screen justify-center items-center z-10'>
            <div className='bg-white p-10 rounded-lg shadow-lg'>
                <div className='flex justify-around items-center'>
                    <h3>Crear carpeta</h3>
                    <button className='text-black p-2 rounded-lg' onClick={onClose}>X</button>
                </div>
                <div>
                    <input type='text' placeholder='Nombre de la carpeta' className='w-full p-2 rounded-lg my-2' />
                    <button className='bg-blue-500 text-white p-2 rounded-lg w-full'>Crear</button>
                </div>
            </div>
        </div>
    </div>
  )
}
