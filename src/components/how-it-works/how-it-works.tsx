import HowButton from "./how-button";
import HowHeader from "./how-header";
import HowImage from "./how-image";
import HowWrapper from "./how-wrapper";
export interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
}
const STEPS: Step[] = [
  {
    number: 1,
    title: "Sube tus datos",
    description:
      "Simplemente cargue sus datos a nuestra plataforma segura. Admitimos diversos formatos de archivo y tipos de datos para garantizar una integración perfecta con sus sistemas existentes.",
    image: "/images/step-1.jpg", // added image references for each step
  },
  {
    number: 2,
    title: "Haga clic en Inicio",
    description:
      "Nuestros algoritmos de IA avanzados procesan y analizan automáticamente sus datos, extrayendo información valiosa y patrones que serían difíciles de identificar manualmente.",
    image: "/images/step-2.jpg",
  },
  {
    number: 3,
    title: "Obtenga información útil",
    description:
      "Reciba información y recomendaciones claras y prácticas basadas en el análisis de IA. Utilice esta información para tomar decisiones basadas en datos y mejorar sus estrategias comerciales.",
    image: "/images/step-3.jpg",
  },
  {
    number: 4,
    title: "Obtenga información útil",
    description:
      "Reciba información y recomendaciones claras y prácticas basadas en el análisis de IA. Utilice esta información para tomar decisiones basadas en datos y mejorar sus estrategias comerciales.",
    image: "/images/step-4.jpg",
  },
];

export default function HowItWorks() {
  const stepsButtons = STEPS.map((step) => (
    <HowButton key={`desktop-${step.number}`} {...step} />
  ));
  const stepsImages = STEPS.map((step, index) => (
    <HowImage key={`desktop-${step.number}`} {...step} priority={index === 0} />
  ));

  return (
    <section className="w-[70%] mx-auto border-b border-border flex flex-col justify-center items-center">
      <HowHeader />

      <div className="w-full px-4 py-3 md:px-8 w-full ">
        <HowWrapper stepsCount={STEPS.length}>
          {stepsButtons}

          {stepsImages}
        </HowWrapper>
      </div>
    </section>
  );
}
