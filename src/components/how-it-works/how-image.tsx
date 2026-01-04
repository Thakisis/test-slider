import Image from "next/image";

import type { Step } from "./how-it-works";

function HowImage({
  image,
  title,
  priority,
  number,
}: Step & { priority: boolean }) {
  return (
    <div
      className="relative transition-opacity duration-700 ease-in-out aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-200 col-start-2 [.active]:opacity-100 opacity-0"
      style={{
        gridColumn: 2,
        gridRow: "1 / -1",
      }}
      data-step={number}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="absolute inset-0 object-contain p-4 w-full h-full"
        priority={priority}
      />
    </div>
  );
}

export default HowImage;
