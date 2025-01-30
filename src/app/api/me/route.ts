import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";

export async function GET() {

    const supabase = await createClient();

    const {
        data: {user},
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }


    const {data: profile, error: profileError} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError) {
        return NextResponse.json({
            error: profileError.message
        }, {
            status: 500
        });
    }


    return NextResponse.json({
        user: profile
    }, {
        status: 200
    });

}