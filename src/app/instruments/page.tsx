"use client";
import { useGetInstrumentsQuery } from "@/store/user/instrumentsApi";

export default function Instruments() {
  const { data } = useGetInstrumentsQuery();
  console.log(
    "process.env.NEXT_PUBLIC_API_URL - ",
    process.env.NEXT_PUBLIC_API_URL
  );
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
