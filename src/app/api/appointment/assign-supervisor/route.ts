import {NextRequest, NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";
import {AssignSupervisorPayload} from "@/types/AssignSupervisorPayload";


export async function POST(req: NextRequest) {

    const supabase = await createClient();

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
        return NextResponse.json({error: "Unauthorized. Only ADMIN can assign supervisors."}, {status: 403});
    }

    let data: AssignSupervisorPayload;
    try {
        data = await req.json();
    } catch (error) {
        console.error('JSON Parsing Error:', error);
        return NextResponse.json({error: 'Invalid JSON'}, {status: 400});
    }


    const {meetingUrl, supervisorId, appointmentId} = data;

    console.log("Data: ", data);

    const {data: appointment, error: appointmentError} = await supabase
        .from("appointment")
        .update({
            meeting_url: meetingUrl,
            supervisor_id: supervisorId
        })
        .eq("id", appointmentId)
        .select("*")
        .single();

    if (appointmentError) {
        return NextResponse.json({error: `Error assigning supervisor: ${appointmentError.message}`}, {status: 500});
    }

    return NextResponse.json(appointment, {status: 200});
}