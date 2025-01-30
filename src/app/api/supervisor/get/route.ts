import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";
import {User} from "@/types/User";

export async function GET(req: Request) {
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
        return NextResponse.json({error: "Unauthorized. Only ADMIN see the list of supervisors"}, {status: 403});
    }

    const {searchParams} = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const orderBy = searchParams.get("orderBy") || "created_at";
    const orderDirection = searchParams.get("orderDirection") || "desc";

    const offset = (page - 1) * limit;

    const {data: supervisors, error: supervisorsError, count: totalItems} = await supabase
        .from("profiles")
        .select("*", {count: "exact"})
        .eq("type", "SUPERVISOR")
        .order(orderBy, {ascending: orderDirection === "asc"})
        .range(offset, offset + limit - 1);

    if (supervisorsError) {
        return NextResponse.json(
            {error: `Error fetching supervisors: ${supervisorsError.message}`},
            {status: 500}
        );
    }

    const result: User[] = supervisors.map((supervisor) => ({
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

    const totalPages = Math.ceil((totalItems || 0) / limit);
    const currentItems = result.length;

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
            data: result,
            meta,
        },
        {status: 200}
    );
}
