import {NextRequest, NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";
import {CreateSupervisorPayload} from "@/types/CreateSupervisorPayload";
import {createAdminClient} from "@/utils/supabase/adminClient";


export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    const {
        data: {user},
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({error: "Not authenticated"}, {status: 401});
    }

    const {data: profile, error: profileError} = await supabase
        .from("profiles")
        .select("type")
        .eq("id", user.id)
        .single();

    if (profileError || profile?.type !== "ADMIN") {
        return NextResponse.json({error: "Unauthorized. Only ADMIN can create supervisors."}, {status: 403});
    }

    let data: CreateSupervisorPayload;
    try {
        data = await req.json();
    } catch (error) {
        console.error('JSON Parsing Error:', error);
        return NextResponse.json({error: 'Invalid JSON'}, {status: 400});
    }

    const {username, gender, age, email, password} = data;

    const {data: newUser, error: userCreationError} = await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (userCreationError) {
        return NextResponse.json({error: `Error creating user: ${userCreationError.message}`}, {status: 500});
    }

    const createdUser = newUser.user;


    if (!createdUser) {
        return NextResponse.json({error: "User creation failed, no user returned"}, {status: 500});
    }

    const {data: updatedProfile, error: profileUpdateError} = await supabase
        .from("profiles")
        .update({
            username,
            gender,
            age,
            type: "SUPERVISOR",
        })
        .eq("id", createdUser.id);


    if (profileUpdateError) {
        return NextResponse.json(
            {error: `Error updating profile: ${profileUpdateError.message}`},
            {status: 500}
        );
    }

    return NextResponse.json({data: updatedProfile}, {status: 200});
}