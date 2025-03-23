"use client";

import { Placeholder } from "@/components/placeholder";

const Error = ({ error }: { error: Error }) => {
    return <Placeholder label={error.message ?? "Something went wrong!"}></Placeholder>
};   

export default Error;