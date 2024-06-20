"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { currentUser } from "@/actions/currentUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types";
import { useUserStore } from "@/store/CurrUserDetails";
import { DashboardIcon } from "@radix-ui/react-icons";
export default function Navbar() {
  // const { name, setUser } = useUserStore();
  const router = useRouter();
  const [value, setvalue] = useState<string>("");
  // const getCurrUser = async () => {
  //   const currUser = await axios.get(
  //     "https://ticketing.dev/api/users/currentuser"
  //   );
  //   const userDetails: User = currUser.data.currentUser;
  //   setUser({
  //     email: userDetails.email,
  //     name: userDetails.name,
  //     id: userDetails.id,
  //     iat: userDetails?.iat,
  //   });
  // };
  // useEffect(() => {
  //   getCurrUser();
  // }, []);
  const name = "a";
  console.log(name.length);
  return (
    <div className=" sticky top-0 backdrop-blur z-50  supports-[backdrop-filter]:bg-background/60  w-full flex justify-between items-center p-6 ">
      <div className=" bg-transparent ">
        <Button
          className="max-lg:p-7 text-3xl lg:text-5xl 2xl:text-6xl "
          asChild
        >
          <Link prefetch className=" text-primarycolor " href={`/`}>
            Stubhub
          </Link>
        </Button>{" "}
      </div>
      {name.length === 0 && (
        <div className=" bg-transparent flex items-center space-x-5 ">
          <div className=" bg-transparent hidden lg:block  ">
            <Button asChild>
              <Link prefetch className=" text-lg 2xl:text-xl " href={`/signin`}>
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link
                prefetch
                className=" text-lg 2xl:text-xl bg-transparent "
                href={`/signup`}
              >
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      )}
      {name.length !== 0 && (
        <div className=" flex space-x-4 ">
          <div>
            <input
              type="text"
              className=" border border-white px-4 py-2 placeholder:text-white rounded-lg "
              placeholder="Search For Tickets"
              onChange={(e) => {
                setvalue(e.target.value);
              }}
            />
            
          </div>
          <div
            onClick={() => {
              router.push(`/dashboard`);
            }}
            className=" cursor-pointer flex items-center gap-4"
          >
            <DashboardIcon className=" lg:size-8 " />
            <h2 className="lg:text-2xl hover:text-muted-foreground ">
              DashBoard
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
