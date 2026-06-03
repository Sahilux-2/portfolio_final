import svgPaths from "./svg-asll6uiju1";

function Socials({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Socials">{children}</g>
      </svg>
    </div>
  );
}
type HText1Props = {
  text: string;
};

function HText1({ text }: HText1Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#0d0b36] text-[24px] tracking-[-0.24px]">{text}</p>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-[#e2e2ed] h-[468px] relative rounded-[16px] shrink-0 w-full">
      <div className="content-stretch flex items-start p-[24px] relative size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#6e6d97] text-[16px] text-nowrap tracking-[-0.16px]">{text}</p>
      </div>
    </div>
  );
}
type HTextProps = {
  text: string;
};

function HText({ text }: HTextProps) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Editor\'s_Note:Light_Italic',sans-serif] grow italic leading-[46px] min-h-px min-w-px relative shrink-0 text-[#0d0b36] text-[40px]">{text}</p>
    </div>
  );
}

export default function PortfolioWeb() {
  return (
    <div className="bg-white relative size-full" data-name="Portfolio web">
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[120px] pt-0 px-0 right-0 top-0" data-name="Hero wrapper">
        <div className="content-stretch flex flex-col gap-[60px] items-center justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          <div className="backdrop-blur-[0px] backdrop-filter bg-gradient-to-t from-[rgba(255,255,255,0)] relative shrink-0 to-[rgba(255,255,255,0.8)] w-full" data-name="Nav bar container">
            <div className="flex flex-col items-center justify-center size-full">
              <div className="content-stretch flex flex-col items-center justify-center p-[60px] relative w-full">
                <div className="bg-[#333] content-stretch flex flex-col items-start max-w-[357px] p-[2px] relative rounded-[18px] shrink-0" data-name="Nab bar">
                  <div className="bg-gradient-to-b content-stretch flex from-[#404040] gap-[24px] items-center justify-center overflow-clip px-[20px] py-[16px] relative rounded-[16px] shadow-[0px_34px_34px_-12px_rgba(0,0,0,0.2),0px_12px_12px_-2px_rgba(0,0,0,0.16),0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 to-[#292929]" data-name="Inner">
                    <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px]">Home</p>
                    <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px]">Case study</p>
                    <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px]">AI builds</p>
                    <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px]">Contact</p>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-1px_2px_0px_rgba(0,0,0,0.99),inset_0px_1px_0.7px_0px_rgba(255,255,255,0.26)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[60px] items-center justify-center relative shrink-0 text-center w-full" data-name="Hero container">
            <div className="h-[276px] relative shrink-0 text-nowrap w-[880px]" data-name="Heading container">
              <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[32px] left-[440.5px] not-italic text-[#6e6d97] text-[24px] top-[18px] tracking-[-0.24px] translate-x-[-50%]">Namaste, I’m Sahil Sinha</p>
              <p className="absolute font-['Satoshi:Bold',sans-serif] leading-[124px] left-[440px] not-italic text-[#0d0b36] text-[112px] top-[44px] tracking-[-1.12px] translate-x-[-50%]">Product designer</p>
              <p className="absolute font-['Editor\'s_Note:Light_Italic',sans-serif] italic leading-[68px] left-[441px] text-[#6e6d97] text-[56px] top-[134px] translate-x-[-50%]">with a</p>
              <p className="absolute font-['Editor\'s_Note:Light_Italic',sans-serif] italic leading-[92px] left-[440px] text-[#0d0b36] text-[80px] top-[186px] translate-x-[-50%]">Builder’s mindset</p>
            </div>
            <div className="font-['Satoshi:Medium',sans-serif] leading-[32px] min-w-full not-italic relative shrink-0 text-[#0d0b36] text-[24px] tracking-[-0.24px] w-[min-content]">
              <p className="mb-0">I specialize in Product Design, with deep craft in visuals and iconography.</p>
              <p>But I don’t stop at Figma, I use AI to build and ship production-ready apps.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 px-0 py-[120px] right-0 top-[758px]" data-name="Case study wrapper">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          <HText text="Case study" />
          <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full" data-name="Case study container">
            {[...Array(2).keys()].map((_, i) => (
              <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Case study container">
                {[...Array(2).keys()].map((_, i) => (
                  <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Card & text container">
                    <Text text="WIP" />
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text container">
                      <HText1 text="Trim (B2C)" />
                      <p className="font-['Satoshi:Bold',sans-serif] leading-[22px] max-w-[340px] not-italic relative shrink-0 text-[#6e6d97] text-[16px] tracking-[-0.16px] w-full">Helping users know if their subscription is worth continuing or not.</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bg-[#f0f0f7] content-stretch flex flex-col items-center justify-center left-0 pb-[24px] pt-[60px] px-0 right-0 top-[3154px]" data-name="Footer wrapper">
        <div className="content-stretch flex flex-col gap-[40px] items-start justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          <div className="content-stretch flex items-center max-w-[960px] relative shrink-0 w-full" data-name="H1">
            <p className="basis-0 font-['Editor\'s_Note:Light_Italic',sans-serif] grow italic leading-[46px] min-h-px min-w-px relative shrink-0 text-[#6e6d97] text-[40px]">Let’s build something meaningful.</p>
          </div>
          <p className="[text-underline-position:from-font] decoration-dotted font-['Satoshi:Bold_Italic',sans-serif] italic leading-[30px] relative shrink-0 text-[#6e6d97] text-[24px] text-nowrap tracking-[-0.24px] underline">sahilsin04@gmail.com</p>
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Socials container">
            <Socials>
              <path d={svgPaths.p2b9e5d00} fill="var(--fill-0, #6E6D97)" id="Shape" />
            </Socials>
            <Socials>
              <path d={svgPaths.p3a83a100} fill="var(--fill-0, #6E6D97)" id="Vector" />
            </Socials>
            <Socials>
              <path d={svgPaths.p36afbb00} fill="var(--fill-0, #6E6D97)" id="Shape" />
            </Socials>
          </div>
          <div className="content-stretch flex items-center justify-center pb-0 pt-[24px] px-0 relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#d1d1ed] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
            <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#6e6d97] text-[16px] tracking-[-0.16px]">© 2026 Sahil Sinha. Designed in Figma. Built with AI.</p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 px-0 py-[120px] right-0 top-[2272px]" data-name="AI builds wrapper">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          <HText text="AI builds" />
          <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="AI builds container">
            <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Card & text container">
              <Text text="WIP" />
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text container">
                <HText1 text="3D fight simulator" />
                <p className="font-['Satoshi:Bold',sans-serif] leading-[22px] max-w-[340px] not-italic relative shrink-0 text-[#6e6d97] text-[16px] tracking-[-0.16px] w-full">Fly around New York city with your friends. Made with Anti gravity.</p>
              </div>
            </div>
            <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Card & text container">
              <Text text="WIP" />
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text container">
                <HText1 text="AI powered Calories tracker" />
                <p className="font-['Satoshi:Bold',sans-serif] leading-[22px] max-w-[340px] not-italic relative shrink-0 text-[#6e6d97] text-[16px] tracking-[-0.16px] w-full">{`Track calories by uploading or clicking picture of the dish. Made with Gemini & Figma make.`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}