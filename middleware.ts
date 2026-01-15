import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtener token de cookies o URL
  const tokenCookie = request.cookies.get("token");
  const tokenUrl = request.nextUrl.searchParams.get("token");
  const token = tokenUrl || tokenCookie?.value;

  // ==================== RUTAS COMPLETAMENTE PÚBLICAS ====================
  // Estas rutas NUNCA redirigen, con o sin token
  const alwaysPublicRoutes = [
    "/",  // 👈 Landing page siempre accesible
  ];

  // ==================== RUTAS PÚBLICAS (redirigen a /home si hay token) ====================
  const publicAuthRoutes = [
    "/auth",
    "/forgot_password",
  ];

  // ==================== RUTAS CON TOKEN EN URL ====================
  const passwordRoutes = [
    "/user/create/password",
    "/user/change/password"
  ];

  // ==================== RUTAS PRIVADAS ====================
  const privateRoutes = [
    "/home",
    "/maker",
    "/user/create/account",
  ];

  // Verificar tipo de ruta
  const isAlwaysPublic = alwaysPublicRoutes.some(route => pathname === route); // 👈 Exacto, no startsWith
  const isPublicAuth = publicAuthRoutes.some(route => pathname.startsWith(route));
  const isPasswordRoute = passwordRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isMenuRoute = pathname.startsWith("/menu");

  // ==================== LÓGICA DE REDIRECCIÓN ====================

  // 1️⃣ Landing page - SIEMPRE permitir acceso
  if (isAlwaysPublic) {
    return NextResponse.next();
  }

  // 2️⃣ Rutas de menú público - SIEMPRE permitir acceso
  if (isMenuRoute) {
    return NextResponse.next();
  }

  // 3️⃣ Rutas de auth/forgot con token → redirigir a /home
  if (isPublicAuth && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 4️⃣ Rutas de auth/forgot sin token → permitir acceso
  if (isPublicAuth && !token) {
    return NextResponse.next();
  }

  // 5️⃣ Rutas de contraseña con token en URL → permitir acceso
  if (isPasswordRoute && tokenUrl) {
    return NextResponse.next();
  }

  // 6️⃣ Rutas de contraseña sin token en URL → redirigir a /auth
  if (isPasswordRoute && !tokenUrl) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 7️⃣ Rutas privadas SIN token → redirigir a /auth
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 8️⃣ Rutas privadas CON token → permitir acceso
  if (isPrivateRoute && token) {
    return NextResponse.next();
  }

  // 9️⃣ Cualquier otra ruta sin token → redirigir a /auth
  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 🔟 Por defecto, permitir acceso
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth',
    '/forgot_password',
    '/home',
    '/user/:path*',
    '/maker/:path*',
  ],
};