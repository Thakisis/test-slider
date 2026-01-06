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

  /* const modifiedButtons = replaceButtons(
    children as React.ReactNode[],
    activeStep,
  );
  const modifiedImages = replaceImages(images as React.ReactNode[], activeStep); */
  const modifiedElements = replaceElements(
    children as React.ReactNode[],
    activeStep,
  );

  return (
    // biome-ignore lint(a11y/noStaticElementInteractions): Delegación de eventos segura – los elementos interactivos reales son <button data-step="..."> que son nativamente accesibles (focusables y activables con teclado). El contenedor solo captura burbujeo de clics.
    <div
      onClick={clickHandler}
      className="grid gap-y-8 xl:gap-y-4  grid-cols-4 grid-rows-[auto_1fr] xl:grid-cols-2 xl:grid-rows-4  overflow-hidden "
    >
      {modifiedElements}
    </div>
  );
}

export default HowWrapper;

function replaceElements(reactNodes: React.ReactNode[], activeStep: number) {
  // como ahora todos los children están juntos, contamos todos y dividimos entre 2
  const totalSteps = Children.count(reactNodes) / 2;

  return Children.map(reactNodes, (child) => {
    if (!isValidElement(child)) return child;

    const props = child.props as Record<string, unknown>;

    if (!props["data-step"]) return child;

    const stepNumber =
      typeof props["data-step"] === "number"
        ? props["data-step"]
        : Number(props["data-step"]);

    const dataType = props["data-type"] as string | undefined;
    const isActive = stepNumber === activeStep;
    const originalClassName =
      typeof props.className === "string" ? props.className : "";

    // Si es imagen y NO está activa retornamos el child original
    if (dataType === "image" && !isActive) {
      return child;
    }

    // si es imagen y está activa retornamos un clone con la clase activa
    if (dataType === "image" && isActive) {
      return cloneElement(child, {
        className: cn(originalClassName, "active"),
      } as { className: string });
    }

    // devolvemos un clone con la nueva transformacion para los botones
    // y si es activo o no
    if (dataType === "button") {
      const classes = [
        "translate-x-0 transition-all xl:translate-x-[0%]", // 0: Activo
        "translate-x-[100%] transition-all xl:translate-x-[0%]", // 1: Asomando
        "translate-x-[200%] xl:translate-x-[0%]", // 2: Oculto derecha
        "translate-x-[-100%] opacity-0 transition-all xl:opacity-100 xl:translate-x-[0%]", // 3+: Oculto izquierda
      ];

      const zIndexes = [10, 5, 0, 0];

      const positionIndex = (stepNumber - activeStep + totalSteps) % totalSteps;

      return cloneElement(child, {
        className: cn(
          originalClassName,
          isActive && "active",
          classes[positionIndex],
          "duration-1000",
        ),
        style: {
          zIndex: zIndexes[positionIndex],
        },
      } as { className: string; style: React.CSSProperties });
    }

    // Si no es ni imagen ni botón, retorna el child original
    return child;
  });
}
