"use client";

import React from "react";
import { WobbleCard } from "../../components/ui/wobble-card";

export default function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Dashboard OS Platform for sales teams!
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            A comprehensive operating system dashboard that reimagines how we interact with digital workspaces. Built with modern web technologies and designed for seamless productivity.
          </p>
        </div>
        <img
          src="/dashboard-os/dashboard-os.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-2 lg:-right-[20%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Do i use design systems? 
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          An experimental platform pushing the boundaries of user experience and interface design. Where innovation meets functionality in a bold new approach to digital interaction.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Tuqqi.com just got a new look!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            A sophisticated project showcasing advanced design patterns and cutting-edge development techniques. Demonstrates the perfect balance between aesthetics and performance.
          </p>
        </div>
        <img
          src="/tuqqi/chat-new1.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 md:-right-[5%] lg:-right-[10%] xl:-right-[15%] -bottom-20 md:-bottom-16 lg:-bottom-20 object-contain rounded-2xl max-w-[400px] md:max-w-[500px] transition-transform duration-300  hover:-translate-x-20 hover:-translate-y--10"
        />
      </WobbleCard>
    </div>
  );
} 