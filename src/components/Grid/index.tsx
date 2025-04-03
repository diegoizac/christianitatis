import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface GridProps {
  /**
   * Elementos filhos do grid
   */
  children: ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Número de colunas em diferentes breakpoints
   */
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /**
   * Espaçamento entre os itens
   */
  gap?: "sm" | "md" | "lg";
  /**
   * Se deve animar os itens
   */
  animate?: boolean;
}

const defaultCols = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 3,
};

const gapSizes = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function Grid({
  children,
  className,
  cols = defaultCols,
  gap = "md",
  animate = true,
}: GridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const gridCols = clsx(
    cols.sm && `grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`
  );

  const Wrapper = animate ? motion.div : "div";
  const Item = animate ? motion.div : "div";

  return (
    <Wrapper
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={clsx("grid w-full", gridCols, gapSizes[gap], className)}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <Item key={index} variants={itemVariants}>
            {child}
          </Item>
        ))
      ) : (
        <Item variants={itemVariants}>{children}</Item>
      )}
    </Wrapper>
  );
}
