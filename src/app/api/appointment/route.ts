import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const supabase = await createClient();

    const {
        data: {user},
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {searchParams} = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const orderBy = searchParams.get("orderBy") || "created_at";
    const orderDirection = searchParams.get("orderDirection") || "desc";

    const offset = (page - 1) * limit;

    const {data: appointments, error: appointmentsError, count: totalItems} = await supabase
        .from("appointment")
        .select("*", {count: "exact"})
        .order(orderBy, {ascending: orderDirection === "asc"})
        .range(offset, offset + limit - 1);

    if (appointmentsError) {
        return NextResponse.json({error: appointmentsError.message}, {status: 500});
    }

    // Extract unique requester, receiver, and supervisor IDs
    const requesterIds = appointments.map((appt) => appt.requester_id);
    const receiverIds = appointments.map((appt) => appt.receiver_id);
    const supervisorIds = appointments.map((appt) => appt.supervisor_id).filter(Boolean); // Exclude null values

    // Fetch all relevant profiles (requesters, receivers, supervisors)
    const {data: profiles, error: profilesError} = await supabase
        .from("profiles")
        .select("*")
        .in("id", [...new Set([...requesterIds, ...receiverIds, ...supervisorIds])]);

    if (profilesError) {
        return NextResponse.json({error: profilesError.message}, {status: 500});
    }

    // Create a mapping of profiles by their ID
    const profilesMap = profiles.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
    }, {});

    // Enrich appointments with requester, receiver, and supervisor details
    const enrichedAppointments = appointments.map((appt) => ({
        ...appt,
        requester: profilesMap[appt.requester_id] || null,
        receiver: profilesMap[appt.receiver_id] || null,
        supervisor: profilesMap[appt.supervisor_id] || null,
    }));

    const totalPages = Math.ceil((totalItems || 0) / limit);
    const currentItems = enrichedAppointments.length;

    const meta = {
        totalItems,
        itemsPerPage: limit,
        totalPages,
        currentItems,
        currentPage: page,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
    };

    return NextResponse.json(
        {
            data: enrichedAppointments,
            meta,
        },
        {status: 200}
    );
}
