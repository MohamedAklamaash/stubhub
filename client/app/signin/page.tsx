"use client";
import { useState, useTransition } from "react";
import loginpic from "@/public/loginpic.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(20, { message: "Password is too large" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
            {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            }
        ),
});

export default function SignUp() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [startTransition, isPending] = useTransition();

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post(
                "https://ticketing.dev/api/users/signin",
                data
            );
            if (res.status === 200) {
                router.push("/");
            }
            reset();
        } catch (error) {
            console.error("Failed to sign in:", error);
        }
    };

    return (
        <div className="h-screen overflow-hidden space-x-10 flex items-center justify-center py-10">
            <form
                className="flex flex-col items-center space-y-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-4xl 2xl:text-6xl text-secondarycolor font-semibold">
                    Sign In
                </h1>
                <input
                    type="email"
                    className="placeholder:text-white p-6 rounded-xl ring-1"
                    placeholder="Enter Your Email"
                    {...register("email")}
                    name="email"
                />
                {errors.email && (
                    <p className="px-5 text-red-500">
                        {errors.email.message as string}
                    </p>
                )}
                <input
                    type="password"
                    className="placeholder:text-white p-6 rounded-xl ring-1"
                    placeholder="Enter Your Password"
                    {...register("password")}
                    name="password"
                />
                {errors.password && (
                    <p className="px-5 text-red-500">
                        {errors.password.message as string}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-1/2 shadow-inner-2xl rounded-full h-10 lg:h-10 bg-[#ebeef1] font-light tracking-wider text-[#000] hover:bg-gray-200"
                >
                    Sign In
                </button>
            </form>
            <div className="hidden lg:block">
                <Image
                    src={loginpic}
                    alt="Login Illustration"
                    priority
                    className="mix-blend-multiply"
                />
            </div>
        </div>
    );
}
