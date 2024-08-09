import React from "react";
import { Container } from "./Container";

export const Error = ({ data }) => {
    return <Container className="flex items-center">
        <div className="flex flex-col items-center">
            <div className="w-36 h-36 text-star-300 relative">
                <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 173.267">
                    <g id="Polygon_1" data-name="Polygon 1" fill="none">
                        <path d="M100,0,200,173.267H0Z" stroke="none" />
                        <path d="M 100 16.00433349609375 L 13.85392761230469 165.267333984375 L 186.1460723876953 165.267333984375 L 100 16.00433349609375 M 100 0 L 200 173.267333984375 L 0 173.267333984375 L 100 0 Z" stroke="none" fill="currentColor" />
                    </g>
                </svg>
                <p className="text-star-50 leading-none flex justify-center items-center w-full h-full absolute top-3 mx-auto text-center font-meta uppercase text-7xl">!</p>
            </div>

            <h1 className=" text-2xl my-4 text-star-50">{data?.message}</h1>
            <div className="text-center" dangerouslySetInnerHTML={{ __html: data?.error }} />
        </div>
    </Container>
}