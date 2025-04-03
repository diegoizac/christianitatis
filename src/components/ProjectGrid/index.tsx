import { Grid } from "../Grid";
import { Card } from "../Card";
import { Section } from "../Section";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href?: string;
}

interface ProjectGridProps {
  title: string;
  subtitle?: string;
  projects: Project[];
}

export function ProjectGrid({ title, subtitle, projects }: ProjectGridProps) {
  return (
    <Section title={title} subtitle={subtitle} variant="alternate">
      <Grid
        cols={{
          sm: 1,
          md: 2,
          lg: 3,
        }}
        gap="lg"
      >
        {projects.map((project, index) => (
          <Card
            key={index}
            title={project.title}
            image={project.image}
            tags={project.tags}
            href={project.href}
            size="md"
          >
            {project.description}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

// Exemplo de uso:
/*
const projects = [
  {
    title: "Projeto 1",
    description: "Descrição do projeto 1",
    image: "/projeto1.jpg",
    tags: ["react", "typescript"],
    href: "https://projeto1.com"
  },
  {
    title: "Projeto 2",
    description: "Descrição do projeto 2",
    image: "/projeto2.jpg",
    tags: ["next.js", "tailwind"],
    href: "https://projeto2.com"
  },
  // ...mais projetos
];

<ProjectGrid
  title="Projetos"
  subtitle="Conheça alguns dos meus trabalhos"
  projects={projects}
/>
*/
