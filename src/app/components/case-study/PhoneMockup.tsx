import React from "react";
import { Mic, ArrowUp, MapPin, Sparkles, Plus, Check } from "lucide-react";

export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[280px] sm:w-[300px] h-[580px] sm:h-[620px] bg-black rounded-[46px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/10 select-none ${className}`}
    >
      {/* Outer Phone Bezel */}
      <div className="relative size-full bg-[#121214] rounded-[38px] overflow-hidden flex flex-col border border-white/10">
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-[22px] w-[86px] bg-black rounded-full flex items-center justify-between px-2.5 pointer-events-none">
          <div className="size-2.5 rounded-full bg-[#18181b]" />
          <div className="size-2.5 rounded-full bg-[#09090b] ring-1 ring-white/10" />
        </div>

        {/* Status Bar */}
        <div className="relative z-20 flex justify-between items-center px-6 pt-3 text-[11px] font-semibold text-black/80 dark:text-white/80">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
              <div className="h-full w-3 bg-current rounded-xs" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="relative flex-1 overflow-hidden">{children}</div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/40 rounded-full z-30 pointer-events-none" />
      </div>
    </div>
  );
}

// 1. Moments Phone (Screenshot 3)
export function MomentsPhoneMockup() {
  return (
    <PhoneFrame>
      <div className="relative size-full flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#f5ede3] via-[#ede4d8] to-[#f8f5ee] p-3 text-left">
        {/* Warm apartment background simulation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-tr from-orange-300 via-amber-200 to-rose-200" />

        <div className="relative z-10 pt-4 flex flex-col gap-2.5">
          {/* Main Moment Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-sm border border-black/[0.04]">
            <p className="text-[11.5px] leading-relaxed text-[#27272a] font-normal">
              You went to an apartment tour at St. Marks, where Alissa showed you around the whole unit. You really liked the place, although it was a bit out of budget.
            </p>

            {/* Action Chips */}
            <div className="flex gap-1.5 mt-2.5">
              <span className="text-[10px] font-medium bg-[#f4f4f5] text-[#52525b] px-2.5 py-1 rounded-full border border-black/[0.04]">
                Compare budget
              </span>
              <span className="text-[10px] font-medium bg-[#f4f4f5] text-[#52525b] px-2.5 py-1 rounded-full border border-black/[0.04]">
                Draft questions
              </span>
            </div>
          </div>

          {/* People Section */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-sm border border-black/[0.04]">
            <div className="text-[10px] text-[#71717a] font-medium mb-1.5">People</div>
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                AB
              </div>
              <span className="text-[11px] font-medium text-[#18181b]">Alissa Booth</span>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-sm border border-black/[0.04]">
            <div className="text-[10px] text-[#71717a] font-medium mb-1.5">Location</div>
            <div className="flex items-start gap-2">
              <div className="size-5 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <MapPin className="size-3" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#18181b]">St. Marks Townhomes</div>
                <div className="text-[9.5px] text-[#71717a]">344 N, Thomas Ave, Brooklyn, NY 11211</div>
              </div>
            </div>
          </div>

          {/* Summary Details */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-sm border border-black/[0.04]">
            <div className="text-[10px] text-[#71717a] font-medium mb-1.5">Summary</div>
            <ul className="text-[10px] leading-relaxed text-[#3f3f46] space-y-1">
              <li>• Alissa gave you a tour of the 2-bedroom on Thomas Ave yesterday.</li>
              <li>• You liked the living room, especially since there was a lot of natural light.</li>
              <li>• No gym in the building, which you wanted to compare with other options.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Voice Prompt Bar */}
        <div className="relative z-10 pt-2 pb-1">
          <div className="bg-white/95 backdrop-blur-md rounded-full px-3 py-2 flex items-center justify-between shadow-md border border-black/[0.06]">
            <div className="flex items-center gap-2">
              <Plus className="size-3.5 text-[#71717a]" />
              <span className="text-[10.5px] text-[#71717a]">Ask anything about this moment</span>
            </div>
            <div className="size-6 rounded-full bg-[#18181b] flex items-center justify-center text-white">
              <ArrowUp className="size-3" />
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// 2. Onboarding Phone (Screenshot 3 - bottom)
export function OnboardingPhoneMockup() {
  return (
    <PhoneFrame>
      <div className="relative size-full flex flex-col justify-between bg-[#fbfbfa] p-4 text-left">
        {/* Top Header */}
        <div className="pt-4 flex items-center justify-between border-b border-black/[0.04] pb-2">
          <div className="flex items-center gap-1 text-[12px] font-semibold text-[#18181b]">
            ChatGPT 5 <span className="text-[#a1a1aa] font-normal">&gt;</span>
          </div>
          <div className="size-6 rounded-full bg-black/5 flex items-center justify-center">
            <Sparkles className="size-3 text-[#71717a]" />
          </div>
        </div>

        {/* Centered Welcome Card */}
        <div className="my-auto flex flex-col items-center text-center px-2">
          <div className="size-14 rounded-2xl bg-gradient-to-tr from-[#ea580c] to-[#f97316] flex items-center justify-center text-white shadow-lg shadow-orange-500/25 mb-4">
            <Sparkles className="size-7" />
          </div>
          <h4 className="text-[16px] font-semibold text-[#18181b] tracking-tight mb-1.5">
            Introducing Tomo
          </h4>
          <p className="text-[11.5px] text-[#71717a] leading-relaxed max-w-[210px] mb-5">
            Your contextual memory companion. Tomo listens, synthesizes, and surfaces insights precisely when you need them.
          </p>

          <div className="w-full bg-white rounded-xl p-3 shadow-xs border border-black/[0.05] text-left mb-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="size-4 rounded-full bg-orange-100 flex items-center justify-center text-[#ea580c]">
                <Check className="size-2.5" />
              </div>
              <span className="text-[11px] font-medium text-[#18181b]">Continuous Awareness</span>
            </div>
            <p className="text-[10px] text-[#71717a] pl-6">
              Encrypted on-device audio buffers, capturing moments seamlessly.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pb-2">
          <button className="w-full bg-[#18181b] text-white text-[11.5px] font-medium py-2.5 rounded-full shadow-sm hover:bg-black transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// 3. Prototyping Phones (Screenshot 4)
export function PrototypePhoneCard({
  caption,
  type,
}: {
  caption: string;
  type: "prompt-suggestions" | "video-call" | "ar-hud" | "transcript-ui";
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-[#e9ebed] rounded-2xl p-4 sm:p-6 w-full flex items-center justify-center border border-black/[0.04]">
        <div className="w-[170px] sm:w-[190px] h-[350px] sm:h-[390px] bg-black rounded-[36px] p-[6px] shadow-lg ring-1 ring-black/10 select-none">
          <div className="relative size-full bg-white rounded-[30px] overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-[14px] w-[50px] bg-black rounded-full" />

            {/* Screen Content by Type */}
            {type === "prompt-suggestions" && (
              <div className="relative size-full bg-[#f8f9fa] p-2.5 flex flex-col justify-end text-left pt-6">
                <div className="space-y-1.5 mb-2">
                  <div className="bg-white rounded-lg p-2 shadow-xs border border-black/[0.04]">
                    <div className="text-[8px] font-semibold text-[#18181b]">Meeting Recap</div>
                    <div className="text-[7.5px] text-[#71717a] mt-0.5">3 action items detected</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-xs border border-black/[0.04]">
                    <div className="text-[8px] font-semibold text-[#18181b]">Draft Email</div>
                    <div className="text-[7.5px] text-[#71717a] mt-0.5">Ready for review</div>
                  </div>
                </div>
                <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1 border border-black/[0.06]">
                  <Mic className="size-2.5 text-[#71717a]" />
                  <span className="text-[7.5px] text-[#a1a1aa]">Ask Tomo...</span>
                </div>
              </div>
            )}

            {type === "video-call" && (
              <div className="relative size-full bg-[#121214] p-2.5 flex flex-col justify-between text-left text-white pt-6">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500" />
                  <div>
                    <div className="text-[8px] font-semibold">Active Session</div>
                    <div className="text-[6.5px] text-emerald-400">● Streaming Context</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10 text-[7px] text-white/90">
                  &ldquo;Analyzing whiteboard diagrams in real-time...&rdquo;
                </div>
              </div>
            )}

            {type === "ar-hud" && (
              <div className="relative size-full bg-gradient-to-b from-[#2b3342] to-[#1a1f2b] p-2.5 flex flex-col justify-between text-left text-white pt-6">
                <div className="size-full flex flex-col justify-center items-center">
                  <div className="border border-orange-400/60 rounded-md p-1.5 bg-black/30 backdrop-blur-sm text-center">
                    <div className="text-[7.5px] font-bold text-orange-300">Spatial Anchor</div>
                    <div className="text-[6.5px] text-white/70">Audio range 3.2m</div>
                  </div>
                </div>
              </div>
            )}

            {type === "transcript-ui" && (
              <div className="relative size-full bg-[#fafaf9] p-2 flex flex-col justify-between text-left pt-6">
                <div className="space-y-1 text-[7.5px] text-[#3f3f46]">
                  <div className="p-1 rounded bg-orange-50 border-l-2 border-orange-500">
                    <span className="font-semibold text-orange-900">Sahil:</span> Let&apos;s make hardware feel invisible.
                  </div>
                  <div className="p-1 rounded bg-slate-100">
                    <span className="font-semibold text-slate-800">Tomo:</span> Captured. Adding to design principles.
                  </div>
                </div>
                <div className="text-[6.5px] text-[#a1a1aa] text-center pb-1">
                  Transcript synced in real-time
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#6e6d97] font-medium text-center">
        {caption}
      </span>
    </div>
  );
}
