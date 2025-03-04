"use client";
import React from 'react'
import Preview from './Preview';


export default function Chat() {
  return (
    <main>
        <section>
            <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 text-start">
                <div>
                    <div className='py-4 space-y-4 flex flex-col'>
                        <p>
                            ¡Hola! Soy tu asistente de documentos multilingüe, aquí para ayudarte a responder preguntas sobre los documentos que has subido.
                        </p>
                        <p>
                            El contexto del proyecto se centra en el diseño y desarrollo de un sitio web interactivo     para Billing and Go, que ofrece una solución en la nube para la automatización de la     facturación y la gestión empresarial. El objetivo es crear un sitio web moderno y     responsivo donde los usuarios puedan suscribirse a diferentes planes, gestionar     facturación, contactos, administración y cobros, así como acceder a funciones avanzadas     como la conciliación bancaria y puntos de autoservicio para restaurantes. Los entregables     del proyecto incluyen documentación detallada de la estructura del sitio web, una interfaz     de usuario atractiva, navegación fácil y acceso a todas las funcionalidades desde     dispositivos móviles y de escritorio. Además, se creará un módulo de gestión de     usuarios para personalizar perfiles, ver el historial de pagos y facturas, y gestionar     saldos de servicio.
                        </p>
                        <p>
                            Aquí hay cinco posibles preguntas que podrías hacer sobre el documento.
                        </p>
                        <ul className="list-disc pl-6">
                            <li><button>Resumir la informacion del documento</button></li>
                            <li><button>Crear una version diferente en base a tu documento</button></li>
                            <li><button>Generar mas ideas para tu documento</button></li>
                            <li><button>Buscar informacion especifica</button></li>
                            <li><button>Hola</button></li>
                        </ul>
                    </div>
                    <div id='chat-input sticky top-0 bg-white z-10 p-4'>
                        <div className='flex space-x-4 bg-white border border-gray-300 rounded-lg p-3'>
                            <button className='text-base text-gray-400'>+</button>
                           <textarea
                           className="w-full text-sm p-2 resize-none focus:outline-none"
                           rows={1}
                           placeholder="Escribe algo..."
                           />   
                           <button className="px-4 py-2 text-sm">Enviar</button>

                        </div>
                      
                    </div>
                </div>
                <div>
                    <Preview />
                </div>
            </div>
        </section>
    </main>
  )
}
