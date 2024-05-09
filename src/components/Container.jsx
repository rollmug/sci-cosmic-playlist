import Image from "next/image";
import Background from "../../public/background-night-sky.jpg";

export const Container = ({ children }) => {
    return (
        <>
            <main className="min-h-screen relative">
                <Image src={Background} priority fill className="w-full h-full object-cover object-bottom z-0" alt="" />
                <section className="relative z-10 container mx-auto max-w-full p-14">
                    {children}
                </section>
            </main>
        </>
    );
}