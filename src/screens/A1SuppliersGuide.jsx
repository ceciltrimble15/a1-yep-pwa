import { ArrowLeft, Building2, Compass, Eye, ShieldCheck, ClipboardCheck, Users, WalletCards } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import ui from '../styles/ui.module.css';
import styles from './A1SuppliersGuide.module.css';

const feedback = ['KEEP', 'CLARIFY', 'STREAMLINE', 'ADD', 'DEFER', 'REJECT'];

export default function A1SuppliersGuide() {
  const { navigate, track } = useYEP();
  const goBack = () => navigate(track ? 'home' : 'track');

  return (
    <Shell showBar={false} showPathway={false}>
      <div className={styles.topRow}>
        <button className={styles.back} type="button" onClick={goBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <span className={styles.badge}>Leadership Orientation · Tablet Guide</span>
      </div>

      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>A/1 Suppliers · Cincinnati · Avondale</div>
          <h1>A/1 Suppliers Learning Guide</h1>
          <p className={styles.lead}>
            This guide explains what A/1 Suppliers is, how YEP and Y.A.E.P. fit inside it, what The Process is teaching, and what leadership should be watching while using the tablet demo.
          </p>
        </div>
        <div className={styles.signature}>
          <strong>Supplying the Tools.<br />Supporting the Hustle.</strong>
          <span>Cecil Trimble · Founder & CEO</span>
        </div>
      </section>

      <div className={styles.grid}>
        <GuideCard icon={Building2} title="1. What A/1 Suppliers Is">
          <p><strong>A/1 Suppliers is the parent youth and community outreach organization.</strong> YEP is one specialized process inside A/1 Suppliers; it is not the whole organization.</p>
          <p>The organization exists to expose young people and young adults to tools, people, technology, money, ownership, skills, relationships, industries, and real-world possibilities they may not have seen yet.</p>
          <blockquote>You cannot choose from a world you have never been exposed to.</blockquote>
        </GuideCard>

        <GuideCard icon={Users} title="2. How The Programs Fit">
          <div className={styles.roleList}>
            <div><strong>YEP</strong><span>Young Entrepreneurs Process · ages 7–17</span></div>
            <div><strong>Y.A.E.P.</strong><span>Young Adult Entrepreneur Process · ages 18–24</span></div>
            <div><strong>The Process</strong><span>The lifelong learning and adaptability system underneath both lanes</span></div>
          </div>
          <p>The goal is not to force somebody into one career. The goal is to help them learn how to explore, try, build, reflect, adapt, and move forward.</p>
        </GuideCard>

        <GuideCard icon={Compass} title="3. The Process">
          <div className={styles.processFlow}>
            <span>EXPLORE</span><b>→</b><span>EXPERIENCE</span><b>→</b><span>LEARN</span><b>→</b><span>REFLECT</span><b>→</b><span>ADAPT</span><b>→</b><span>EXPLORE AGAIN</span>
          </div>
          <p>FINISHER gives the participant a discipline framework: <strong>Focus, Identity, Network, Innovation, Strategy, Hustle, Execution, Resilience.</strong></p>
          <p>The app should keep moving the participant toward real action, not just more information.</p>
        </GuideCard>

        <GuideCard icon={ClipboardCheck} title="4. What The Tablet Is For">
          <p>This tablet is a <strong>controlled experience test build</strong>. It is being used to see whether the experience makes sense before a larger pilot.</p>
          <ul>
            <li>Choose the correct age pathway.</li>
            <li>Create a Power Name for the demo.</li>
            <li>Use My Direction and the Exposure Engine.</li>
            <li>Try Daily Quest, S.T.E.M.Sin, Mirror, FINISHER, reflection, mentor, and proof screens.</li>
            <li>Use Listen and Talk to YEP where available.</li>
            <li>Review what the tablet actually saved.</li>
          </ul>
          <p><strong>Important:</strong> this demo does not prove program outcomes. It proves whether the product experience is understandable and usable.</p>
        </GuideCard>

        <GuideCard icon={Eye} title="5. What Unc Should Watch For">
          <ul>
            <li>Where somebody understands the screen immediately.</li>
            <li>Where they hesitate, get confused, or need somebody to explain it.</li>
            <li>Whether the language sounds like A/1 Suppliers and The Process.</li>
            <li>Whether the app leads to action instead of just reading.</li>
            <li>Whether buttons, voice, audio, saved progress, portrait, and landscape work.</li>
            <li>Whether the experience feels useful for real young people, parents, mentors, and facilitators.</li>
          </ul>
          <p>The job is not to defend the app. The job is to <strong>observe what is actually happening</strong> and bring that evidence back.</p>
        </GuideCard>

        <GuideCard icon={ShieldCheck} title="6. Demo Safety Rules">
          <ul>
            <li>Use sample or non-sensitive information only.</li>
            <li>Do not enter Social Security numbers, medical information, addresses, IDs, or other sensitive data.</li>
            <li>Do not treat demo feedback as formal program outcome evidence.</li>
            <li>Do not promise a feature is final because it appears in the demo.</li>
            <li>Do not publicly distribute the demo link yet.</li>
            <li>Reset the demo participant before handing a tablet to the next tester unless the test plan says otherwise.</li>
          </ul>
        </GuideCard>

        <GuideCard icon={WalletCards} title="7. Leadership Roles Around The App">
          <div className={styles.roleList}>
            <div><strong>Cecil</strong><span>Founder & CEO · vision, approvals, direction, brand, final decisions</span></div>
            <div><strong>Unc</strong><span>COO / operations lens · field usability, implementation, people, execution, feedback</span></div>
            <div><strong>Tyra</strong><span>Treasurer / governance lens · financial discipline, funder clarity, accountability, organizational understanding</span></div>
            <div><strong>Krisha</strong><span>QA lens · defects, retests, forms, app behavior, voice/audio, evidence before completion</span></div>
          </div>
        </GuideCard>

        <GuideCard icon={ClipboardCheck} title="8. How To Report Feedback">
          <p>Use one of these six buckets for every meaningful observation:</p>
          <div className={styles.feedback}>{feedback.map((item) => <span key={item}>{item}</span>)}</div>
          <p>Record: <strong>Tablet 01 or 02 · pathway · screen · what happened · what you expected · bucket · screenshot if needed.</strong></p>
          <p>The goal is to turn opinions into evidence we can use for the next build.</p>
        </GuideCard>
      </div>

      <section className={styles.closeout}>
        <h2>What Success Looks Like Right Now</h2>
        <p>Leadership can explain A/1 Suppliers in plain language, understand how YEP / Y.A.E.P. fit, move through the tablet without guessing, identify what works and what does not, and bring back useful evidence for the next version.</p>
        <button className={ui.btnPrimary} type="button" onClick={goBack}>Return To The Tablet Experience</button>
      </section>
    </Shell>
  );
}

function GuideCard({ icon: Icon, title, children }) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.icon}><Icon size={20} /></span>
        <h2>{title}</h2>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </section>
  );
}
