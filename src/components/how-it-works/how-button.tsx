import { cn } from "@/lib/utils";
import type { Step } from "./how-it-works";

function HowButton({ number, title, description }: Step) {
  const rows = [
    "xl:row-start-1 xl:col-start-1 xl:col-end-1",
    "xl:row-start-2 xl:col-start-1 xl:col-end-1",
    "xl:row-start-3 xl:col-start-1 xl:col-end-1",
    "xl:row-start-4 xl:col-start-1 xl:col-end-1",
  ];

  return (
    <button
      type="button"
      className={cn(
        "group px-4 py-2 relative flex text-left gap-6 transition-opacity duration-300   xl:max-w-none",
        rows[number - 1],
        "col-start-1  col-end-5 max-w-[75%] row-start-1  ",
      )}
      data-step={number}
      data-type="button"
    >
      {/* Left indicator line with progress */}
      <div className="absolute inset-x-2 h-1 left-0 bottom-0  xl:h-full xl:w-1 bg-slate-100 rounded-full overflow-hidden ">
        <div className="h-full w-0 xl:h-0  xl:w-full bg-primary transition-all duration-100 ease-linear xl:group-[.active]:animate-progress-bar group-[.active]:animate-progress-mobile" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 py-1">
        <h3 className="text-xl font-bold text-slate-900">
          {number}. {title}
        </h3>
        <p className="max-w-md text-slate-600 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </button>
  );
}

export default HowButton;
