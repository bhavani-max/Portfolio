import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { personalInfo } from '../data';
import './Contact.css';

const links = [
  {
    icon: '✉️',
    label: 'Email Me',
    href: `mailto:${personalInfo.email}`,
    sub: personalInfo.email,
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    href: personalInfo.linkedin,
    sub: 'bhavani-sankar-mekala',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    href: personalInfo.github,
    sub: 'bhavani-max',
  },
  {
    icon: '💡',
    label: 'LeetCode',
    href: personalInfo.leetcode,
    sub: 'bhavani2004',
  },
];

export default function Contact() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="contact" className="section contact" ref={ref}>
      <motion.div
        className="contact__inner"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact__tag">Get In Touch</div>

        <h2 className="contact__title">
          Let's Build<br />
          <span>Something.</span>
        </h2>

        <p className="contact__sub">
          Open to internship and full-time opportunities. Let's connect and create something great together.
        </p>

        <div className="contact__links">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact__link"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.4)' }}
            >
              <span className="contact__link-icon">{l.icon}</span>
              <div>
                <div className="contact__link-label">{l.label}</div>
                <div className="contact__link-sub">{l.sub}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
