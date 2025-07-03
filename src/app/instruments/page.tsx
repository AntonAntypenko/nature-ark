"use client"
import {useGetInstrumentsQuery} from "@/store/user/instrumentsApi";

export default function Instruments() {
    const {data} = useGetInstrumentsQuery();

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}