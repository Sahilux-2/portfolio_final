export default function CaseStudyWrapper() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-0 py-[120px] relative size-full" data-name="Case study wrapper">
      <div className="content-stretch flex flex-col gap-[24px] items-center justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="H1">
          <p className="basis-0 font-['Editor\'s_Note:Light_Italic',sans-serif] grow italic leading-[46px] min-h-px min-w-px relative shrink-0 text-[#0d0b36] text-[40px]">Case study</p>
        </div>
        <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full" data-name="Case study container">
          {[...Array(2).keys()].map((_, i) => (
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Case study container">
              {[...Array(2).keys()].map((_, i) => (
                <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Card & text container">
                  <div className="bg-[#e2e2ed] h-[468px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
                    <div className="content-stretch flex items-start p-[24px] relative size-full">
                      <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#6e6d97] text-[16px] text-nowrap tracking-[-0.16px]">WIP</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text container">
                    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="H2">
                      <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#0d0b36] text-[24px] tracking-[-0.24px]">Trim (B2C)</p>
                    </div>
                    <p className="font-['Satoshi:Bold',sans-serif] leading-[22px] max-w-[340px] not-italic relative shrink-0 text-[#6e6d97] text-[16px] tracking-[-0.16px] w-full">Helping users know if their subscription is worth continuing or not.</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}