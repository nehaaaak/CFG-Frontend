import { motion } from "framer-motion";
import HeroEditor from "./hero/hero-editor";

type LandingProps = {
  code: string;
  setCode: any;
  setSampleOpen: any;
  handleGenerateCFG: () => void;
  isPending: boolean;
};

const Landing = ({
  code,
  setCode,
  setSampleOpen,
  handleGenerateCFG,
  isPending,
}: LandingProps) => {
  return (
    <>
      <motion.div
        key="hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex-1 min-h-0 flex items-center justify-center relative"
      >
        <DotGrid />
        <HeroEditor
          code={code}
          setCode={setCode}
          setSampleOpen={setSampleOpen}
          handleGenerateCFG={handleGenerateCFG}
          isPending={isPending}
        />
      </motion.div>
    </>
  );
};

export default Landing;

const DotGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute inset-0 block dark:hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%,
            rgba(251,146,60,0.2) 0%,
            rgba(254,215,170,0.12) 40%,
            transparent 70%
          )
        `,
        backgroundColor: "#fffaf7",
      }}
    />
    <div
      className="absolute inset-0 hidden dark:block"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%,
            rgba(251,146,60,0.12) 0%,
            rgba(180,70,15,0.07) 40%,
            transparent 70%
          )
        `,
        backgroundColor: "#111111",
      }}
    />
  </div>
);
