import { motion } from 'framer-motion';
import { personalInfo, stats } from '../data';
import './Hero.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Status pill */}
      <motion.div className="hero__tag" {...fadeUp(0.2)}>
        <span className="hero__dot" />
        Available for opportunities
      </motion.div>

      {/* Name */}
      <motion.h1 className="hero__name" {...fadeUp(0.4)}>
        <span className="hero__name-line1">Bhavani</span>
        <span className="hero__name-line2">Sankar.</span>
      </motion.h1>

      {/* Role badge */}
      <motion.div className="hero__role" {...fadeUp(0.5)}>
        <span className="hero__role-text">Java Full Stack Developer</span>
        <span className="hero__divider">·</span>
        <span className="hero__role-text">Spring Boot</span>
        <span className="hero__divider">·</span>
        <span className="hero__role-text">React.js</span>
      </motion.div>

      {/* Description */}
      <motion.p className="hero__desc" {...fadeUp(0.6)}>
        {personalInfo.description}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div className="hero__btns" {...fadeUp(0.75)}>
        <button className="btn-primary" onClick={() => scrollTo('projects')}>
          View Projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="btn-outline" onClick={() => scrollTo('contact')}>
          Get In Touch
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div className="hero__stats" {...fadeUp(0.9)}>
        {stats.map((s, i) => (
          <div key={i} className="hero__stat">
            <div className="hero__stat-num">{s.num}</div>
            <div className="hero__stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="hero__scroll-arrow"
        />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
