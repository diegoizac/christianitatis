import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface SectionProps {
  /**
   * Título da seção
   */
  title: string;
  /**
   * Subtítulo da seção
   */
  subtitle?: string;
  /**
   * Conteúdo da seção
   */
  children: ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * ID da seção para navegação
   */
  id?: string;
  /**
   * Variante da seção
   */
  variant?: "default" | "alternate";
}

export default function Section({
  title,
  subtitle,
  children,
  className,
  id,
  variant = "default",
}: SectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
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

  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={clsx(
        "py-24",
        variant === "alternate"
          ? "bg-gray-50 dark:bg-gray-900"
          : "bg-white dark:bg-gray-800",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-secondary leading-relaxed">{subtitle}</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
