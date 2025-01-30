import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";
import {User} from "@/types/User";

export async function GET() {
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
        return NextResponse.json({error: "Unauthorized. Only ADMIN can see available supervisors"}, {status: 403});
    }

    const {data: assignedSupervisors, error: appointmentError} = await supabase
        .from("appointment")
        .select("supervisor_id");

    if (appointmentError) {
        return NextResponse.json({error: `Error fetching appointments: ${appointmentError.message}`}, {status: 500});
    }

    const assignedSupervisorIds = assignedSupervisors
        .map((appointment) => appointment.supervisor_id)
        .filter((id) => id !== null);

    const {data: availableSupervisors, error: supervisorsError} = await supabase
        .from("profiles")
        .select("*")
        .eq("type", "SUPERVISOR")
        .not("id", "in", `(${assignedSupervisorIds.join(",")})`);

    if (supervisorsError) {
        return NextResponse.json({error: `Error fetching available supervisors: ${supervisorsError.message}`}, {status: 500});
    }

    const result: User[] = availableSupervisors.map((supervisor) => ({
        id: supervisor.id,
        username: supervisor.username,
        gender: supervisor.gender,
        age: supervisor.age,
        email: supervisor.email,
        origin: supervisor.origin,
        nationality: supervisor.nationality,
        referral_code: supervisor.referral_code,
        avatar: supervisor.avatar,
        completed: supervisor.completed,
        created_at: supervisor.created_at,
        updated_at: supervisor.updated_at,
        type: supervisor.type,
    }));

    return NextResponse.json(
        result,
        {status: 200}
    );
}
