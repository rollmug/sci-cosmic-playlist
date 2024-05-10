import React from "react";
import { Container } from "./Container";

export const Error = ({ data }) => {
    return <Container className="flex items-center">
        <div className="flex flex-col items-center">
            <h1 className=" text-2xl my-4">{data.message}</h1>
            {data.error}
        </div>
    </Container>
}