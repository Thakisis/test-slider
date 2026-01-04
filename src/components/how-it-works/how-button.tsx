import type { Step } from "./how-it-works";

function HowButton({ number, title, description }: Step) {
  return (
    <button
      type="button"
      className="group relative flex text-left gap-6 transition-opacity duration-300 "
      style={{
        gridColumn: 1,
        gridRow: number,
      }}
      data-step={number}
    >
      {/* Left indicator line with progress */}
      <div className="absolute -left-4 top-0 h-full w-1 bg-slate-100 rounded-full overflow-hidden ">
        <div className="w-full bg-primary transition-all duration-100 ease-linear group-[.active]:animate-progress-bar" />
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
