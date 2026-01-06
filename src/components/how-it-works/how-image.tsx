import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Step } from "./how-it-works";

function HowImage({
  image,
  title,
  priority,
  number,
}: Step & { priority: boolean }) {
  return (
    <div
      className={cn(
        "relative transition-opacity duration-700 ease-in-out aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-200  [.active]:opacity-100 opacity-0",
        "col-span-full row-start-2  xl:col-start-2 xl:row-span-full",
      )}
      data-step={number}
      data-type="image"
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
