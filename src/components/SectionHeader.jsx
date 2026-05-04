import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function SectionHeader({ tag, title }) {
  const [ref, inView] = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="sec-header"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '3.5rem' }}
    >
      <div style={{
        fontSize: '0.75rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '0.75rem',
        fontWeight: 600,
      }}>
        {tag}
      </div>
      <h2 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
        fontWeight: 800,
        letterSpacing: '-1.5px',
        lineHeight: 1,
        color: 'var(--text)',
      }}>
        {title}
      </h2>
    </motion.div>
  );
}
