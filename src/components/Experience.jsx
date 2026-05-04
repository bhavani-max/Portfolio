import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { experiences } from '../data';
import './Experience.css';

function TimelineItem({ exp, index }) {
  const [ref, inView] = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="timeline-left">
        <motion.div
          className="timeline-dot"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring' }}
        >
          {exp.icon}
        </motion.div>
        {index < experiences.length - 1 && <div className="timeline-line" />}
      </div>

      <motion.div
        className="timeline-card"
        whileHover={{ borderColor: 'rgba(0,212,255,0.3)', y: -3 }}
        transition={{ duration: 0.2 }}
      >
        <div className="timeline-card__header">
          <div>
            <h3 className="timeline-card__title">{exp.title}</h3>
            <div className="timeline-card__company">
              {exp.company} · {exp.location}
            </div>
          </div>
          <span className="timeline-card__date">{exp.date}</span>
        </div>

        <ul className="timeline-card__points">
          {exp.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <SectionHeader tag="Work Experience" title="Where I've Worked" />
      <div className="timeline">
        {experiences.map((exp, i) => (
          <TimelineItem key={exp.title} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
