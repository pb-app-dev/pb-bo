import {NextRequest, NextResponse} from 'next/server';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const token = request.cookies.get("token")?.value;
    const isDashboardRoot = url.pathname === "/dashboard";
    const isDashboard = url.pathname.startsWith("/dashboard");
    const isSignIn = url.pathname.startsWith("/signin");
    const isHome = url.pathname === "/";

    // ✅ If logged in and on "/" → Redirect to "/dashboard/users"
    if (token && isHome) {
        url.pathname = "/dashboard/users";
        return NextResponse.redirect(url);
    }

    // ✅ If logged in and trying to access "/signin" → Redirect to "/dashboard/users"
    if (token && isSignIn) {
        url.pathname = "/dashboard/users";
        return NextResponse.redirect(url);
    }

    // ✅ If logged in and trying to access "/dashboard" (without a specific subpath) → Redirect to "/dashboard/users"
    if (token && isDashboardRoot) {
        url.pathname = "/dashboard/users";
        return NextResponse.redirect(url);
    }

    // ✅ If not logged in and trying to access "/dashboard" or "/" → Redirect to "/signin"
    if (!token && (isDashboard || isHome)) {
        url.pathname = "/signin";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
        '/',
        '/dashboard/:path*',
        '/signin',
    ],
};
