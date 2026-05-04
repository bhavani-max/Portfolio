import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { achievements } from '../data';
import './Achievements.css';

export default function Achievements() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="achievements" className="section achievements">
      <SectionHeader tag="Recognition" title="Achievements" />
      <div className="ach__grid" ref={ref}>
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            className="ach-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, borderColor: 'rgba(0,212,255,0.3)' }}
          >
            <div className="ach-card__icon">{a.icon}</div>
            <p className="ach-card__text">{a.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
