import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaWordpress,
  FaDatabase,
} from 'react-icons/fa6';

const skills = [
  { icon: <FaHtml5 />, name: 'HTML', color: '#e34f26' },
  { icon: <FaCss3Alt />, name: 'CSS', color: '#1572b6' },
  { icon: <FaJs />, name: 'JavaScript', color: '#f7df1e' },
  { icon: <FaReact />, name: 'React', color: '#61dafb' },
  { icon: <FaPython />, name: 'Python', color: '#3776ab' },
  { icon: <FaGitAlt />, name: 'Git', color: '#f05032' },
  { icon: <FaGithub />, name: 'GitHub', color: '#aaa' },
  { icon: <FaDatabase />, name: 'MySQL', color: '#00758f' },
  { icon: <FaWordpress />, name: 'WordPress', color: '#21759b' },
];

// Create rows for the vertical marquee
const rows = [];
for (let i = 0; i < skills.length; i++) {
  rows.push([skills[i], skills[(i + 3) % skills.length]]);
}
// Double the rows for seamless loop
const doubledRows = [...rows, ...rows];

export default function SkillsMarquee() {
  return (
    <div className="skills-marquee-container">
      <div className="skills-marquee-track">
        {doubledRows.map((row, i) => (
          <div key={i} className="skills-row">
            {row.map((skill, j) => (
              <div key={j} className="skill-chip">
                <span style={{ color: skill.color, display: 'flex', alignItems: 'center' }}>
                  {skill.icon}
                </span>
                {skill.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
