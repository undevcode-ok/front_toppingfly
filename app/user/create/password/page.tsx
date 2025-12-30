//pagina de crear contraseña : renderiza la pagina de creacion
"use client"

import { PasswordCreateCard } from './components/Password_Create_Card';
import { Suspense } from 'react';

const page = () => {
    /*
    RECORDATORIO:
    Tenes comentado
     -el form en password_form.ts
     -el passwordChangeService en handlers
    
     recuerda pasar el token en change_service.ts, body.
    
    */
    return (
        <div className='w-full h-screen sm:h-auto sm:max-w-md'>
            <Suspense fallback={<div>Cargando...</div>}>
            <PasswordCreateCard />
            </Suspense>
        </div>
    );
};

export default page;