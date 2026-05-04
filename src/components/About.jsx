import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import './About.css';

export default function About() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="about" className="section about">
      <div className="about__grid">
        {/* Visual side */}
        <motion.div
          ref={ref}
          className="about__visual"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main card */}
          <motion.div
            className="about-card about-card--main"
            whileHover={{ y: -8, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="about-card__avatar">BS</div>
            <div className="about-card__name">Bhavani Sankar Mekala</div>
            <div className="about-card__role">Java Full Stack Developer</div>
            <div className="about-card__info">
              <span>📍 Vijayawada, India</span>
              <span>🎓 BTech IT, DIET 2026</span>
              <span>💼 Sandspace Technologies</span>
            </div>
          </motion.div>

          {/* Float 1 */}
          <motion.div
            className="about-card about-card--float1"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="float-icon">⚡</div>
            <div className="float-title">Currently Building</div>
            <div className="float-sub">Full-Stack Web Apps · React + Spring Boot</div>
          </motion.div>

          {/* Float 2 */}
          <motion.div
            className="about-card about-card--float2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="float-icon">🏆</div>
            <div className="float-title">Runner Up</div>
            <div className="float-sub">VRSEC Drone Fusion Hackathon</div>
          </motion.div>

          {/* Float 3 */}
          <motion.div
            className="about-card about-card--float3"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="float-icon">⚛️</div>
            <div className="float-title">Qiskit 2025</div>
            <div className="float-sub">Quantum Computing Enthusiast</div>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <SectionHeader tag="About Me" title="Building Things That Matter" />

          <div className="about__paragraphs">
            <p>
              I'm a <span>Java Full Stack Developer</span> and BTech IT student at Dhanekula
              Institute of Engineering and Technology, graduating in 2026 with a CGPA of 8.36.
            </p>
            <p>
              I'm passionate about writing <span>clean, maintainable code</span> and building
              software that solves real problems — from REST APIs and secure authentication systems
              to responsive UIs and desktop applications.
            </p>
            <p>
              Beyond coding, I explore emerging tech like <span>Quantum Computing</span> (Qiskit
              Summer School 2025), competitive programming (150+ LeetCode problems), and
              hackathons across India.
            </p>
          </div>

          <div className="about__quick-facts">
            {[
              { label: 'University', val: 'DIET — Ganguru, AP' },
              { label: 'Degree', val: 'BTech Information Technology' },
              { label: 'CGPA', val: '8.36 / 10' },
              { label: 'Location', val: 'Vijayawada, India' },
            ].map((f) => (
              <div key={f.label} className="about__fact">
                <span className="fact-label">{f.label}</span>
                <span className="fact-val">{f.val}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
