'use server';

import {SignInActionPayload} from "@/types/SignInActionPayload";
import {createClient} from "@/utils/supabase/server";

export const signIn = async (props: SignInActionPayload) => {
    const supabase = await createClient();

    // Step 1: Attempt to sign in
    const {data: authData, error: authError} = await supabase.auth.signInWithPassword(props);

    if (authError) {
        return {
            error: authError.message
        };
    }

    // Step 2: Check the user's type in the profiles table
    const {data: profile, error: profileError} = await supabase
        .from('profiles')
        .select('type')
        .eq('id', authData.user.id)
        .single();


    if (profileError || !profile) {
        await supabase.auth.signOut();
        return {
            error: "Unable to verify user type. Please contact support."
        };
    }

    console.log("PROFILE", JSON.stringify(profile, null, 2));

    if (profile.type !== 'ADMIN' && profile.type !== 'SUPERVISOR') {
        await supabase.auth.signOut();
        return {
            error: "Access denied. Only admins can log in."
        };
    }

    return {
        error: null
    };

};
