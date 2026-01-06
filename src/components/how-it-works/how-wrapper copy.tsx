"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface HowWrapperProps {
  children: React.ReactNode;
  stepsCount: number;
  initialStep?: number;
  autoPlayInterval?: number;
  images: React.ReactNode[];
}

function HowWrapper({
  children,
  stepsCount,
  initialStep = 1,
  autoPlayInterval = 5000,
  images,
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

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTimer]);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>(
      "button[data-step]",
    );

    if (!button || !button.dataset.step) return;

    const newStep = Number(button.dataset.step);

    if (newStep === activeStep) return;
    if (newStep < 1 || newStep > stepsCount) return;
    setActiveStep(newStep);
  };

  const modifiedButtons = replaceButtons(
    children as React.ReactNode[],
    activeStep,
  );
  const modifiedImages = replaceImages(images as React.ReactNode[], activeStep);

  return (
    // biome-ignore lint(a11y/noStaticElementInteractions): Delegación de eventos segura – los elementos interactivos reales son <button data-step="..."> que son nativamente accesibles (focusables y activables con teclado). El contenedor solo captura burbujeo de clics.
    <div
      onClick={clickHandler}
      className=" xl:grid   grid-cols-4 grid-rows-2 xl:grid-cols-2 xl:grid-rows-4  overflow-hidden "
    >
      <div className="mb-7 grid  col-span-3 xl:grid-col-span-2 xl:grid-rows-subgrid xl:row-span-full xl:col-start-1      xl:grid-cols-subgrid xl:grid-rows-none   xl:grid-cols-none  xl:grid-rows-subgrid xl:row-span-full xl:col-start-1 gap-4">
        {modifiedButtons}
      </div>
      <div className="grid  xl:row-span-full xl:col-start-2 items-center">
        {modifiedImages}
      </div>
    </div>
  );
}

export default HowWrapper;

function replaceImages(reactNodes: React.ReactNode[], activeStep: number) {
  return Children.map(reactNodes, (child) => {
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
}
function replaceButtons(reactNodes: React.ReactNode[], activeStep: number) {
  const totalSteps = Children.count(reactNodes);

  const classes = [
    "translate-x-0   transition-all  xl:translate-x-[0%]", // 0: Activo
    "translate-x-[100%] transition-all  xl:translate-x-[0%]", // 1: Asomando
    "translate-x-[200%]   xl:translate-x-[0%]", // 2: Oculto derecha (sin animación)
    "translate-x-[-100%] opacity-0 transition-all  xl:opacity-100 xl:translate-x-[0%]", // 3+: Oculto izquierda
  ];

  const zIndexes = [10, 5, 0, 0];

  return Children.map(reactNodes, (child) => {
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
    const positionIndex = (stepNumber - activeStep + totalSteps) % totalSteps;
    const classIndex = positionIndex <= 2 ? positionIndex : 3;
    return cloneElement(child, {
      className: cn(
        originalClassName,
        isActive && "active",
        classes[classIndex],
        "duration-1000",
      ),
      style: {
        zIndex: zIndexes[classIndex],
      },
    } as { className: string; style: React.CSSProperties });
  });
}
