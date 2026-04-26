// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { motion, AnimatePresence } from "framer-motion";

// export const ModeToggler = () => {
//   const { theme, setTheme } = useTheme();
//   const isDark = theme === "dark";

//   return (
//     <button
//       onClick={() => setTheme(isDark ? "light" : "dark")}
//       className="relative w-9 h-9 rounded-md flex items-center justify-center transition-colors shadow-xl"
//     >
//       <AnimatePresence mode="wait">
//         {isDark ? (
//           <motion.span
//             key="sun"
//             initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
//             transition={{ duration: 0.2, ease: "easeInOut" }}
//             className="absolute"
//           >
//             <Sun className="h-4 w-4" />
//           </motion.span>
//         ) : (
//           <motion.span
//             key="moon"
//             initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
//             transition={{ duration: 0.2, ease: "easeInOut" }}
//             className="absolute"
//           >
//             <Moon className="h-4 w-4" />
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </button>
//   );
// };

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const ModeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md bg-orange-50 dark:bg-orange-950/30 shadow-inner shadow-orange-200/60 dark:shadow-orange-900/40" />
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-md flex items-center justify-center transition-colors bg-background shadow-inner shadow-background/60"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute"
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute"
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
