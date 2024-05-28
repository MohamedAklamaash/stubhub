import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    return (
        <div className=" sticky top-0 backdrop-blur z-50  supports-[backdrop-filter]:bg-background/60  w-full flex justify-between items-center p-6 ">
            <div>
                <Button className=" text-3xl lg:text-5xl 2xl:text-6xl " asChild>
                    <Link className=" text-primarycolor " href={`/`}>
                        Stubhub
                    </Link>
                </Button>{" "}
            </div>
            <div className=" flex items-center space-x-5 ">
                <div className=" hidden lg:block  ">
                    <Button asChild>
                        <Link
                            className=" text-lg 2xl:text-xl "
                            href={`/signin`}
                        >
                            Sign In
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link
                            className=" text-lg 2xl:text-xl bg-transparent "
                            href={`/signup`}
                        >
                            Sign Up
                        </Link>
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <GiHamburgerMenu className=" size-6 lg:size-7 " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <Button className=" w-full text-lg ">
                                My Account
                            </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button className="">
                                    <Link
                                        className=" text-lg "
                                        href={`/signup`}
                                    >
                                        Sign Up
                                    </Link>
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button>
                                    <Link
                                        className=" text-lg "
                                        href={`/signin`}
                                    >
                                        Sign In
                                    </Link>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
