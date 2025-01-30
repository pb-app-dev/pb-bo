import {NextResponse, type NextRequest} from 'next/server';
import {createServerClient} from '@supabase/ssr';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({name, value, options}) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: {user},
    } = await supabase.auth.getUser();

    const {data: profile} = await supabase
        .from("profiles")
        .select("type")
        .eq("id", user?.id)
        .single();

    const url = request.nextUrl.clone();
    const {pathname} = url;

    if (!user && pathname !== '/signin') {
        url.pathname = '/signin';
        return NextResponse.redirect(url);
    }

    if (user && pathname === '/signin') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    if (user && pathname === '/') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/dashboard/supervisors') && profile?.type !== 'ADMIN') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }


    return supabaseResponse;
}