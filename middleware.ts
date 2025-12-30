import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Obtener el token de las cookies
  const tokenCookie = request.cookies.get("token");
  // Obtener el token de la URL (si está presente como parámetro)
  const tokenUrl = request.nextUrl.searchParams.get("token");
  // Seleccionar el token válido, priorizando el token de la URL
  const token = tokenUrl || tokenCookie;
  
  const { pathname } = request.nextUrl;
  const idParam = request.nextUrl.searchParams.get("id");

  // Definir rutas públicas (no requieren token)
  const publicRoutes = ["/auth", "/forgotpassword"];
  // Definir rutas privadas (requieren token)
  const privateRoutes = ["/home", "/user/create/account"];
  // Definir rutas específicas de cambio de contraseña (requieren token)
  const passwordRoutes = ["/user/create/password", "/user/change/password"];
  // Definir rutas de maker (requieren token)
  const makerRoutes = "/maker"; // Cualquier ruta que empiece con /maker
  // Definir rutas de menu (requieren token si no tiene el id)
 

  // Verificar si la ruta es pública
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  // Verificar si la ruta es privada
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  // Verificar si la ruta es de cambio de contraseña
  const isPasswordRoute = passwordRoutes.some(route => pathname.startsWith(route));
  // Verificar si la ruta es /maker o cualquier subruta de /maker
  const isMakerRoute = pathname.startsWith(makerRoutes);
 

  // Si el usuario tiene token y está intentando acceder a una ruta pública (auth, forgotpassword), redirigir a /home
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Si la ruta no es pública (ni /auth ni /forgotpassword) y no hay token, redirigir a /auth
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Si la ruta es de cambio de contraseña y no hay token, redirigir a /auth
  if (isPasswordRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Si la ruta es /maker o cualquier subruta de /maker y no hay token, redirigir a /auth
  if (isMakerRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  
  
  // Si es ruta privada y NO hay token, redirigir a /auth
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Permitir continuar
  return NextResponse.next();
}

// Configurar las rutas a las que se aplicará el middleware
export const config = {
  matcher: [
    '/', 
    '/auth',
    '/forgotpassword',
    '/home',
    '/user/:path*', // Captura /user/create/account y cualquier subruta de /user
    '/user/create/password',
    '/user/change/password', // Rutas de cambio de contraseña
    '/maker', // Ruta base de maker
    '/maker/:path*', // Asegura que también se capturen las subrutas de /maker
  ],
};
