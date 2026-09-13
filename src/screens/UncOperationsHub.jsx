import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardList,
  Eye,
  Handshake,
  LockKeyhole,
  NotebookPen,
  Save,
  Target,
  WalletCards,
} from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import styles from './UncOperationsHub.module.css';

const NOTES_KEY = 'a1_unc_operations_notes_v1';

const emptyNotes = {
  meeting: '',
  field: '',
  nextMove: '',
  proof: '',
  updatedAt: '',
};

function loadNotes() {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? { ...emptyNotes, ...JSON.parse(raw) } : emptyNotes;
  } catch {
    return emptyNotes;
  }
}

export default function UncOperationsHub() {
  const { navigate, track } = useYEP();
  const [notes, setNotes] = useState(loadNotes);
  const [saved, setSaved] = useState(false);
  const goBack = () => navigate(track ? 'home' : 'track');

  useEffect(() => {
    setSaved(false);
  }, [notes.meeting, notes.field, notes.nextMove, notes.proof]);

  function update(name, value) {
    setNotes((current) => ({ ...current, [name]: value }));
  }

  function saveNotes() {
    const next = { ...notes, updatedAt: new Date().toLocaleString() };
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
    } catch {
      // Local notes are optional; the hub still works if storage is unavailable.
    }
    setNotes(next);
    setSaved(true);
  }

  return (
    <Shell showBar={false} showPathway={false}>
      <div className={styles.topRow}>
        <button className={styles.back} type="button" onClick={goBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <span className={styles.badge}>Internal Leadership Tool · Do Not Publicly Distribute</span>
      </div>

      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>Unc's A/1 Suppliers Operations Hub</div>
          <h1>Know It. Work It. Show The Proof.</h1>
          <p>
            This is your working guide for understanding A/1 Suppliers, operating inside the movement,
            preparing for meetings, using the tablet, recording what happened, and helping move the organization forward.
          </p>
        </div>
        <div className={styles.roleCard}>
          <span>Your Lane</span>
          <strong>Operations / COO Lens</strong>
          <p>People · field execution · usability · relationships · follow-through · evidence</p>
        </div>
      </section>

      <div className={styles.grid}>
        <HubCard icon={BriefcaseBusiness} title="Your Role Right Now">
          <p>You are an <strong>active A/1 Suppliers leadership member</strong>, not somebody standing on the outside looking in. Your job is to help turn the vision into movement people can actually see, use, understand, and trust.</p>
          <ul>
            <li>Understand the mission and explain it in plain language.</li>
            <li>Know how YEP, Y.A.E.P., and The Process fit under A/1 Suppliers.</li>
            <li>Use the tablet yourself so you can speak from experience.</li>
            <li>Watch how real people respond and bring back evidence.</li>
            <li>Help with field execution, relationships, events, introductions, and follow-through.</li>
            <li>Protect the work: show enough to prove it is real without handing out the whole internal system.</li>
          </ul>
        </HubCard>

        <HubCard icon={BookOpenCheck} title="What You Need To Know Cold">
          <p><strong>A/1 Suppliers</strong> is the parent youth and community outreach organization.</p>
          <p><strong>YEP</strong> serves ages 7–17. <strong>Y.A.E.P.</strong> serves ages 18–24. <strong>The Process</strong> is the learning and adaptability system underneath both.</p>
          <p><strong>FINISHER:</strong> Focus · Identity · Network · Innovation · Strategy · Hustle · Execution · Resilience.</p>
          <p><strong>The lifelong loop:</strong> Explore → Experience → Learn → Reflect → Adapt → Explore Again.</p>
          <blockquote>You cannot choose from a world you have never been exposed to.</blockquote>
        </HubCard>

        <HubCard icon={Eye} title="What The Tablet Proves">
          <p>The tablet gives A/1 Suppliers something concrete to demonstrate. It shows that the ideas have been organized into an actual experience people can move through.</p>
          <ul>
            <li>Age pathways</li>
            <li>My Direction + Exposure</li>
            <li>Quests + S.T.E.M.Sin</li>
            <li>Mirror + FINISHER</li>
            <li>Reflection + saved proof</li>
            <li>Listen / Talk to YEP test features</li>
          </ul>
          <p><strong>Do not say the demo proves youth outcomes yet.</strong> It proves the product/process can be experienced and tested.</p>
        </HubCard>

        <HubCard icon={Handshake} title="How To Show It Without Giving It Away">
          <p>Give people a <strong>controlled bite</strong>, not the whole kitchen.</p>
          <ol>
            <li>Explain A/1 Suppliers in one minute.</li>
            <li>Show the branded tablet launch.</li>
            <li>Show one pathway and one My Direction / Exposure example.</li>
            <li>Show one interactive feature such as voice, a quest, or reflection.</li>
            <li>Show that progress/proof can be saved.</li>
            <li>Stop and ask what they understood, what interested them, and what opportunity they see.</li>
          </ol>
          <p>Do not hand out source code, internal admin access, private operating documents, participant data, or unrestricted demo links.</p>
        </HubCard>

        <HubCard icon={Target} title="What You Are Watching For">
          <ul>
            <li>What grabs attention immediately?</li>
            <li>Where does somebody get confused?</li>
            <li>What makes them ask a serious question?</li>
            <li>What part feels useful enough that they want to participate, partner, fund, mentor, or introduce somebody?</li>
            <li>What does not work on the tablet?</li>
            <li>What should Cecil hear before the next decision?</li>
          </ul>
          <p>Bring back evidence, not just “they liked it.”</p>
        </HubCard>

        <HubCard icon={WalletCards} title="Path Toward A Paid Position">
          <p>The goal can be to build this into a paid operations position, but compensation should follow organizational readiness — not be promised before the budget and role are formally approved.</p>
          <div className={styles.pathSteps}>
            <span>1. Active contribution</span>
            <span>2. Documented responsibilities</span>
            <span>3. Measurable output + proof</span>
            <span>4. Formal role description</span>
            <span>5. Funding / operating budget</span>
            <span>6. Approved compensation structure</span>
          </div>
          <p>Every useful meeting, test, introduction, event, follow-up, and operational improvement helps document the value of the role.</p>
        </HubCard>

        <HubCard icon={ClipboardList} title="Meeting / Conference Prep">
          <label className={styles.label} htmlFor="meetingNotes">Who are we meeting, why are we meeting, what should we show, and what is the next ask?</label>
          <textarea id="meetingNotes" className={styles.textarea} value={notes.meeting} onChange={(event) => update('meeting', event.target.value)} placeholder="Example: Meeting with school/community partner. Objective: explain A/1 Suppliers, show one YEP pathway, learn what population they serve, secure a second meeting..." />
        </HubCard>

        <HubCard icon={NotebookPen} title="Field Notes">
          <label className={styles.label} htmlFor="fieldNotes">What happened? What did the person understand? What confused them? What did they say?</label>
          <textarea id="fieldNotes" className={styles.textarea} value={notes.field} onChange={(event) => update('field', event.target.value)} placeholder="Record observations while they are fresh. Do not enter sensitive participant information." />
        </HubCard>

        <HubCard icon={Target} title="Next Move">
          <label className={styles.label} htmlFor="nextMove">What needs to happen next, who owns it, and when?</label>
          <textarea id="nextMove" className={styles.textarea} value={notes.nextMove} onChange={(event) => update('nextMove', event.target.value)} placeholder="Example: Cecil sends one-page overview. Unc follows up Thursday. Partner identifies two staff members for demo review..." />
        </HubCard>

        <HubCard icon={LockKeyhole} title="Proof / Sample Log">
          <label className={styles.label} htmlFor="proofNotes">What sample did you show, and what proof came out of it?</label>
          <textarea id="proofNotes" className={styles.textarea} value={notes.proof} onChange={(event) => update('proof', event.target.value)} placeholder="Example: Showed launch + My Direction + voice demo. They asked about a 10-person pilot. Screenshot / contact / follow-up captured separately..." />
        </HubCard>
      </div>

      <section className={styles.savePanel}>
        <div>
          <strong>Private Tablet Notes</strong>
          <span>{notes.updatedAt ? `Last saved: ${notes.updatedAt}` : 'Not saved yet on this device.'}</span>
        </div>
        <button type="button" onClick={saveNotes}><Save size={18} /> {saved ? 'Saved' : 'Save Notes On This Tablet'}</button>
      </section>

      <section className={styles.footerPanel}>
        <h2>Operating Rule</h2>
        <p>We are not trying to tell everybody everything. We are proving that A/1 Suppliers is real, organized, usable, and moving. Show the right sample, protect the internal system, listen closely, document the response, and make the next move.</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => navigate('a1Guide')}>Open A/1 Suppliers Learning Guide</button>
          <button type="button" onClick={goBack}>Return To Tablet Experience</button>
        </div>
      </section>
    </Shell>
  );
}

function HubCard({ icon: Icon, title, children }) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <span><Icon size={20} /></span>
        <h2>{title}</h2>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </section>
  );
}
