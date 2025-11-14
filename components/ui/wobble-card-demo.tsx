"use client";
import React from "react";
import { WobbleCard } from "../../components/ui/wobble-card";

export default function WhatIDoSection() {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="mb-8 lg:mb-12 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3">
          What I do
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.04em] text-neutral-50">
          I design, prototype and build modern product experiences.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl">
          I work at the intersection of product design, AI workflows, and front-end implementation.
          From early concepts to production-ready interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Product Design */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-900/80 border border-white/5 min-h-[260px]"
          className="flex flex-col justify-between gap-6 md:gap-8"
        >
          <div className="max-w-md">
            <h3 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.03em] text-neutral-50">
              Product Design (UX/UI)
            </h3>
            <p className="mt-3 text-left text-sm md:text-base text-neutral-300/90">
              Sharp, minimal interfaces focused on clarity, flow, and conversion. From complex dashboards
              to simple landing pages.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-neutral-300/80">
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              UX flows
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              UI systems
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              Design systems
            </span>
          </div>
        </WobbleCard>

        {/* Visual identity & Front-End - Small top right */}
        <WobbleCard
          containerClassName="col-span-1 min-h-[260px] bg-neutral-900/80 border border-white/5"
          className="flex flex-col justify-between gap-4"
        >
          <div>
            <h3 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.03em] text-neutral-50">
              Visual identity & front-end build
            </h3>
            <p className="mt-3 text-left text-sm md:text-base text-neutral-300/90">
              From visual language and design tokens to real, shippable UI in code. I can stay in Figma, or
              take it all the way into React / Next.js with motion and micro-interactions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-neutral-300/80">
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              Design tokens
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              Next.js / React
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              Motion
            </span>
          </div>
        </WobbleCard>

        {/* AI & Prototyping - Bottom full width */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 bg-neutral-900/80 border border-white/5 min-h-[260px]"
          className="flex flex-col lg:flex-row justify-between gap-8 lg:items-end"
        >
          <div className="max-w-xl">
            <h3 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.03em] text-neutral-50">
              AI-enhanced product workflows
            </h3>
            <p className="mt-3 text-left text-sm md:text-base text-neutral-300/90">
              Designing products that leverage AI as a real feature, not just a buzzword — from content tools
              to intelligent assistants.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-neutral-300/80">
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              AI UX
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              Prompt flows
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 bg-white/5 backdrop-blur-sm">
              Prototyping
            </span>
          </div>
        </WobbleCard>
      </div>
    </section>
  );
}
