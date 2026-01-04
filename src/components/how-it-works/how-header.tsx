import { Badge } from "@/components/ui/badge";

function HowHeader() {
	return (
		<div className="relative px-4 py-12 md:py-16 md:px-8 border-b border-border w-full flex justify-center items-center">
			{/* Dashed Bottom Fade Grid */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `
                   linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                   linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
                 `,
					backgroundSize: "20px 20px",
					backgroundPosition: "0 0, 0 0",
					maskImage: `
                    repeating-linear-gradient(
                         to right,
                         black 0px,
                         black 3px,
                         transparent 3px,
                         transparent 8px
                       ),
                       repeating-linear-gradient(
                         to bottom,
                         black 0px,
                         black 3px,
                         transparent 3px,
                         transparent 8px
                       ),
                       radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
                 `,
					WebkitMaskImage: `
             repeating-linear-gradient(
                         to right,
                         black 0px,
                         black 3px,
                         transparent 3px,
                         transparent 8px
                       ),
                       repeating-linear-gradient(
                         to bottom,
                         black 0px,
                         black 3px,
                         transparent 3px,
                         transparent 8px
                       ),
                       radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
                 `,
					maskComposite: "intersect",
					WebkitMaskComposite: "source-in",
				}}
			/>
			<div className="relative w-full max-w-2xl flex flex-col justify-center items-center space-y-4">
				<Badge className="px-3 py-1 bg-background text-foreground border-border shadow-xl">
					Inicio Rápido
				</Badge>
				<h3 className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl">
					Empieza a vender en 4 simples pasos
				</h3>
			</div>
		</div>
	);
}

export default HowHeader;
