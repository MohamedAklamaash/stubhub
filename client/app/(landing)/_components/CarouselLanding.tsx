/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JLfzWaImOtP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import carousel1 from "@/public/carousel1.webp";
import Image from "next/image";
export default function CarouselLanding() {
    return (
        <div className="w-full h-[75vh] relative overflow-hidden">
            <Carousel className="w-full h-full">
                <CarouselContent>
                    <CarouselItem>
                        <div className="relative w-full h-full">
                            <Image
                                src={carousel1}
                                alt="Carousel Image 1"
                                layout="fill"
                                className=" h-full "
                                objectFit="cover"
                            />
                            <div className="  absolute bottom-8 left-8 text-white text-2xl font-bold">
                                Explore the Himalayas
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative w-full h-full">
                            <Image
                                src={carousel1}
                                alt="Carousel Image 1"
                                layout="fill"
                                className=" h-full "
                                objectFit="cover"
                            />
                            <div className="absolute bottom-8 left-8 text-white text-2xl font-bold">
                                Discover the Beaches of Bali
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative w-full h-full">
                            <Image
                                src={carousel1}
                                alt="Carousel Image 1"
                                layout="fill"
                                className=" h-full "
                                objectFit="cover"
                            />
                            <div className="absolute bottom-8 left-8 text-white text-2xl font-bold">
                                Unwind in the Serene Forests
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative w-full h-full">
                            <Image
                                src={carousel1}
                                alt="Carousel Image 1"
                                layout="fill"
                                className=" h-full "
                                objectFit="cover"
                            />
                            <div className="absolute bottom-8 left-8 text-white text-2xl font-bold">
                                Explore the Vibrant Cities
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative w-full h-full">
                            <Image
                                src={carousel1}
                                alt="Carousel Image 1"
                                layout="fill"
                                className=" h-full "
                                objectFit="cover"
                            />
                            <div className="absolute bottom-8 left-8 text-white text-2xl font-bold">
                                Discover the Hidden Gems
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />
            </Carousel>
        </div>
    );
}
