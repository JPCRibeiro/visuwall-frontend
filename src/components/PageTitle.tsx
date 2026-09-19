import type { LucideIcon } from "lucide-react";

type PageTitleProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export default function PageTitle({ Icon, title, description }: PageTitleProps) {
  return (
    <div className="bg-[radial-gradient(500px_80px_at_0px_top,rgba(96,240,209,0.3),transparent)] py-3.5 pl-7 pr-5">
      <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000] flex items-center gap-3 mb-2">
        <Icon className="drop-shadow-[0_4px_2px_#141414]" size={40} color="#03e3b8"/>
        {title}
      </h3>
      <p className="text-white font-semibold text-base">
        {description}
      </p>
    </div>
  );
}