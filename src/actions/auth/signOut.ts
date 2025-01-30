'use server';

import {cookies} from 'next/headers';
import {createClient} from "@/utils/supabase/server";

export const signOut = async () => {
    const supabase = await createClient();
    const cookieStore = await cookies();
    await supabase.auth.signOut();
    cookieStore.delete('sb-ztijoerhakegjvffiisn-auth-token');
};
