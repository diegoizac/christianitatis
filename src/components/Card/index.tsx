import { ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { clsx } from "clsx";

interface CardProps {
  /**
   * Título do card
   */
  title?: string;
  /**
   * Subtítulo do card
   */
  subtitle?: string;
  /**
   * Conteúdo do card
   */
  children: ReactNode;
  /**
   * Tags para categorização
   */
  tags?: string[];
  /**
   * Link para mais detalhes
   */
  href?: string;
  /**
   * Imagem de fundo ou thumbnail
   */
  image?: string;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Variante do card
   */
  variant?: "default" | "project" | "feature";
  /**
   * Tamanho do card
   */
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const cardSizes = {
  sm: {
    card: "max-w-sm",
    image: "h-40",
    title: "text-lg",
    subtitle: "text-sm",
    content: "text-sm",
  },
  md: {
    card: "max-w-md",
    image: "h-48",
    title: "text-xl",
    subtitle: "text-base",
    content: "text-base",
  },
  lg: {
    card: "max-w-lg",
    image: "h-56",
    title: "text-2xl",
    subtitle: "text-lg",
    content: "text-lg",
  },
};

export function Card({
  title,
  subtitle,
  children,
  tags,
  href,
  image,
  className,
  variant = "default",
  size = "md",
  onClick,
}: CardProps) {
  // Mouse position para efeito de spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Variantes de animação
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const sizes = cardSizes[size];

  const Content = () => (
    <motion.div
      onMouseMove={handleMouseMove}
      className={clsx(
        "relative w-full h-full rounded-xl overflow-hidden",
        "bg-gradient-to-br from-white to-gray-50",
        "dark:from-gray-800 dark:to-gray-900",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "border border-gray-100 dark:border-gray-700",
        "group",
        sizes.card,
        className
      )}
    >
      {/* Efeito de spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--accent-light), 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {image && (
        <div className={clsx("relative w-full overflow-hidden", sizes.image)}>
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-4 md:p-6 relative">
        {title && (
          <motion.h3
            className={clsx(
              "font-bold mb-2",
              "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
              sizes.title
            )}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
        )}

        {subtitle && (
          <p
            className={clsx(
              "text-secondary/80 mb-4",
              "transform transition-all duration-300 group-hover:text-secondary",
              sizes.subtitle
            )}
          >
            {subtitle}
          </p>
        )}

        <div
          className={clsx(
            "text-gray-600 dark:text-gray-300",
            "transform transition-all duration-300",
            "group-hover:text-gray-700 dark:group-hover:text-gray-200",
            sizes.content
          )}
        >
          {children}
        </div>

        {tags && tags.length > 0 && (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                className={clsx(
                  "px-3 py-1 rounded-full",
                  "bg-accent/10 text-accent",
                  "backdrop-blur-sm",
                  "border border-accent/20",
                  "text-xs md:text-sm",
                  "transform transition-all duration-300",
                  "hover:bg-accent/20 hover:scale-105"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const cardContent = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="w-full flex justify-center"
      onClick={onClick}
    >
      <Content />
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-xl"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
