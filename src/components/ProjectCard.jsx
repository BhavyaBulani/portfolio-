import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    name: 'MedBuddy',
    description:
      'AI-powered web app that simplifies medical prescriptions by extracting, interpreting, and presenting them in a user-friendly format. Features medicine tracking, reminders, and nearby pharmacy locator.',
    tech: ['React.js', 'Node.js', 'Supabase', 'Gemini AI'],
    github: 'https://github.com/BhavyaBulani/MedBuddy',
    live: null,
  },
];

export default function ProjectCard() {
  return (
    <div>
      {projects.map((project, i) => (
        <div key={i} className="project-item">
          <div className="project-header">
            <span className="project-name">{project.name}</span>
            <div className="project-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  id={`project-github-${i}`}
                  title="View on GitHub"
                >
                  <FiGithub />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  id={`project-live-${i}`}
                  title="View Live"
                >
                  <FiExternalLink />
                </a>
              )}
            </div>
          </div>
          <p className="project-desc">{project.description}</p>
          <div className="project-tech">
            {project.tech.map((t, j) => (
              <span key={j} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
