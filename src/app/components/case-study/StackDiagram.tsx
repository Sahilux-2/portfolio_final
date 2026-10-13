export function StackDiagram() {
  return (
    <div className="w-full my-8 bg-[#f2f3f6] rounded-[20px] p-6 sm:p-10 md:p-12 border border-black/[0.05] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase font-mono text-[#8a8a9e] mb-8 font-medium">
        &ldquo;THE STACK&rdquo;
      </div>

      <div className="max-w-[560px] mx-auto flex flex-col items-center gap-3 sm:gap-3.5">
        {/* Tier 1: App Layer */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-[72%] sm:w-[68%]">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2.5 sm:py-3 text-center text-xs sm:text-[13px] font-medium text-[#64748b] shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/[0.04]">
            App
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2.5 sm:py-3 text-center text-xs sm:text-[13px] font-medium text-[#64748b] shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/[0.04]">
            App
          </div>
          <div className="bg-[#e84a27] text-white rounded-lg py-2.5 sm:py-3 text-center text-xs sm:text-[13px] font-semibold shadow-[0_4px_12px_rgba(232,74,39,0.3)] transition-transform hover:scale-[1.02]">
            ChatGPT
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2.5 sm:py-3 text-center text-xs sm:text-[13px] font-medium text-[#64748b] shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/[0.04]">
            App
          </div>
        </div>

        {/* Tier 2: Platform Layer */}
        <div className="w-[82%] sm:w-[78%] bg-white/90 backdrop-blur-sm rounded-lg py-3 sm:py-3.5 text-center text-xs sm:text-[13px] font-medium text-[#334155] shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/[0.04]">
          Platform
        </div>

        {/* Tier 3: Operating System Layer */}
        <div className="w-[92%] sm:w-[88%] bg-white/90 backdrop-blur-sm rounded-lg py-3 sm:py-3.5 text-center text-xs sm:text-[13px] font-medium text-[#334155] shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/[0.04]">
          Operating System
        </div>

        {/* Tier 4: Hardware Layer */}
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-lg py-3.5 sm:py-4 text-center text-xs sm:text-[13px] font-medium text-[#334155] shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/[0.04]">
          Hardware
        </div>
      </div>
    </div>
  );
}
