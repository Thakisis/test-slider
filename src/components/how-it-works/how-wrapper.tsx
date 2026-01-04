"use client";

import {
	Children,
	cloneElement,
	isValidElement,
	useState,
	useRef,
	useEffect,
	useEffectEvent,
} from "react";

interface HowWrapperProps {
	children: React.ReactNode;
	stepsCount: number;
	initialStep?: number;
	autoPlayInterval?: number;
}

function HowWrapper({
	children,
	stepsCount,
	initialStep = 1,
	autoPlayInterval = 5000,
}: HowWrapperProps) {
	const [activeStep, setActiveStep] = useState(initialStep);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const startTimer = useEffectEvent(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			setActiveStep((prev) => (prev >= stepsCount ? 1 : prev + 1));
		}, autoPlayInterval);
	});

	// Cada vez que cambie el paso activo (por clic o por timer), reiniciamos el autoplay
	useEffect(() => {
		startTimer();
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [activeStep]); // startTimer es estable gracias a useEffectEvent

	const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		const button = (e.target as HTMLElement).closest("button");

		if (!button || !button.dataset.step) return;

		const newStep = Number(button.dataset.step);

		if (newStep === activeStep) return;
		if (newStep < 1 || newStep > stepsCount) return;

		setActiveStep(newStep);
		// → El useEffect anterior reiniciará el timer automáticamente
	};

	const modifiedChildren = Children.map(children, (child) => {
		if (!isValidElement(child)) return child;

		const props = child.props as Record<string, unknown>;

		if (!props["data-step"]) return child;

		const stepNumber =
			typeof props["data-step"] === "number"
				? props["data-step"]
				: Number(props["data-step"]);

		const isActive = stepNumber === activeStep;
		const originalClassName =
			typeof props.className === "string" ? props.className : "";

		return cloneElement(child, {
			className: `${originalClassName} ${isActive ? "active" : ""}`.trim(),
		} as { className: string });
	});

	return (
		<div
			onClick={clickHandler}
			className="grid grid-cols-2 items-center grid-rows-auto"
			style={{
				gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
				gridTemplateRows: `repeat(4, minmax(0, 1fr))`,
			}}
		>
			{modifiedChildren}
		</div>
	);
}

export default HowWrapper;
