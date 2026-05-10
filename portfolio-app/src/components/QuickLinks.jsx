import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import LogoLoop from './LogoLoop';

const links = [
  {
    label: 'GitHub',
    icon: <FiGithub />,
    href: 'https://github.com/BhavyaBulani',
    className: 'github',
  },
  {
    label: 'LinkedIn',
    icon: <FiLinkedin />,
    href: 'https://www.linkedin.com/in/bhavya-bulani',
    className: 'linkedin',
  },
  {
    label: 'Gmail',
    icon: <FiMail />,
    href: 'mailto:bhavyabulani9@gmail.com',
    className: 'gmail',
  },
];

export default function QuickLinks() {
  return (
    <div className="links-container" style={{ position: 'relative', width: '100%', padding: '10px 0' }}>
      <LogoLoop
        logos={links}
        speed={80}
        direction="left"
        logoHeight={100}
        gap={40}
        hoverSpeed={0}
        fadeOut={true}
        fadeOutColor="transparent"
        ariaLabel="Quick Links"
        renderItem={(link, key) => (
          <a
            key={key}
            href={link.href}
            target={link.href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="link-item"
            id={`link-${link.label.toLowerCase()}-${key}`}
            style={{ width: '80px', paddingTop: '10px' }}
          >
            <div className={`link-icon-wrapper ${link.className}`}>
              {link.icon}
            </div>
            <span className="link-label" style={{ marginTop: '10px' }}>{link.label}</span>
          </a>
        )}
      />
    </div>
  );
}
