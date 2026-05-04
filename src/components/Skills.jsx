import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { skills } from '../data';
import './Skills.css';

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" className="section skills">
      <SectionHeader tag="Technical Stack" title="Skills & Tools" />

      <div className="skills__grid" ref={ref}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.title}
            className="skill-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, borderColor: 'rgba(0,212,255,0.3)' }}
          >
            <div className="skill-card__icon" style={{ background: skill.color }}>
              {skill.icon}
            </div>
            <h3 className="skill-card__title">{skill.title}</h3>
            <div className="skill-card__tags">
              {skill.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="skill-tag"
                  whileHover={{
                    background: 'rgba(0,212,255,0.1)',
                    borderColor: 'rgba(0,212,255,0.3)',
                    color: 'var(--accent)',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
