import { NextResponse } from "next/server";
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
    try {
        const { data: instruments } = await supabase.from("instruments").select();
        return NextResponse.json(instruments);
    } catch {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}