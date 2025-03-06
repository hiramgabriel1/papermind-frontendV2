"use client";

import React from 'react'
import { useEffect, useState} from 'react';
import Createfile from './Createfile';

export default function Document() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

  return (
    <main>
        <section>
            <div className='flex justify-between'>
                <div>
                    <h3 className='font-semibold text-2xl'>
                        Documentos
                    </h3>
                    <p className='text-gray-500'>
                        Mira todos tus archivos aqui.
                    </p>
                </div>
                <div className='flex space-x-4 justify-center'>
                    <div>
                        <button className='px-3 py-2 border border-gray-500 rounded-lg'>Crear carpeta</button>
                    </div>
                    <div>
                        <button className='px-3 py-2 border border-gray-500 bg-black text-white rounded-lg' onClick={() => setIsOpen(true)}>Subir</button>

                        {isOpen && <Createfile onClose={() => setIsOpen(false)} />}
                    </div>
                </div>
            </div>
            <div className='flex space-x-3 py-6'>
                <input type="text" name="search" placeholder='Search' className='border border-gray-500 px-3 rounded-lg text-gray-500'/>
                <select name="filter" id="filter" defaultValue={1} className='border border-gray-500 px-3 text-gray-500 rounded-lg'>
                    <option value="1">Todos</option>
                    <option value="2">Recientes</option>
                    <option value="3">3 meses antes</option>
                    <option value="4">6 meses antes</option>
                </select>
                
            </div>
        </section>
    </main>
  )
}
