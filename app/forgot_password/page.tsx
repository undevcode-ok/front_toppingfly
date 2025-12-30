//pagina de recuperar contraseña : renderiza la pagina de recuperacion
"use client"

import { EmailCard } from './components/email_card';


const page = () => {
    return (
        <div className='w-full h-screen sm:h-auto sm:max-w-md'>
            <EmailCard />
        </div>
    );
};

export default page;