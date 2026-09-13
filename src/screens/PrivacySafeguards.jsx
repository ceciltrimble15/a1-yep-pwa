import { ArrowLeft, ShieldCheck, LockKeyhole, Mic, Users, Database, EyeOff, FileCheck2, TabletSmartphone } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import styles from './PrivacySafeguards.module.css';

export default function PrivacySafeguards() {
  const { navigate, track } = useYEP();
  const goBack = () => navigate(track ? 'home' : 'track');

  return (
    <Shell showBar={false} showPathway={false}>
      <div className={styles.topRow}>
        <button className={styles.back} type="button" onClick={goBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <span className={styles.badge}>Privacy · Safety · Infrastructure Protection</span>
      </div>

      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>A/1 Suppliers Safeguard Standard · V0.5 Demo</div>
          <h1>Protect the people. Protect the Process. Protect A/1.</h1>
          <p>
            A/1 Suppliers uses minimum-data, consent-first, need-to-know practices. The tablet demo is for controlled testing and learning. It is not an unrestricted data-collection system.
          </p>
        </div>
        <div className={styles.notice}>
          <ShieldCheck size={28} />
          <strong>Demo rule</strong>
          <span>Use a nickname or Power Name. Do not enter sensitive or unnecessary personal information.</span>
        </div>
      </section>

      <div className={styles.grid}>
        <PolicyCard icon={Database} title="1. What this demo saves">
          <p>Current V0.5 participant progress is saved in the browser on this tablet so the experience can continue after a screen change or reopen.</p>
          <p><strong>A/1 Suppliers should collect only what is needed for the test.</strong> Do not use this demo to build a real participant database yet.</p>
          <ul>
            <li>Use a nickname or Power Name instead of a full legal name.</li>
            <li>Do not enter home addresses, personal phone numbers, personal email addresses, Social Security numbers, government IDs, medical information, passwords, financial account information, or other sensitive data.</li>
            <li>Reset the demo record before the next tester unless an approved test plan says otherwise.</li>
          </ul>
        </PolicyCard>

        <PolicyCard icon={Mic} title="2. Voice and microphone disclosure">
          <p><strong>Listen to YEP</strong> uses the device/browser voice to read screen content aloud.</p>
          <p><strong>Talk to YEP</strong> is optional. The microphone starts only after the user deliberately taps the voice control. The app does not intentionally create or save a raw audio file.</p>
          <p>The browser or device speech service may process speech to create a transcript. Because a child’s voice can be personal information, youth voice use must follow the approved consent/privacy process. Until that process is formally approved, staff should use typing for youth testing and reserve microphone testing for authorized adult/staff demos.</p>
        </PolicyCard>

        <PolicyCard icon={Users} title="3. Children and parental consent">
          <p>A/1 Suppliers serves youth, including children under 13. For any real online collection of personal information from a child under 13, A/1 Suppliers must use the required parent/guardian notice and verifiable consent process before collection unless a lawful exception applies.</p>
          <p>This V0.5 acknowledgment is <strong>not</strong> parental consent. It is only a demo-use safeguard.</p>
          <p>Until approved intake and consent are in place, use coded, sample, or non-sensitive information only.</p>
        </PolicyCard>

        <PolicyCard icon={FileCheck2} title="4. Transparency and consent standard">
          <ul>
            <li>Tell people what information is being requested and why.</li>
            <li>Do not collect more information than is reasonably necessary.</li>
            <li>Separate program participation consent from photo/video/media permission.</li>
            <li>For minors, use the approved parent/guardian process before real personal-data collection.</li>
            <li>Give the appropriate person a way to ask what is held, request correction, and request deletion when required.</li>
            <li>Do not use participant information for a new purpose without the appropriate notice and permission.</li>
          </ul>
        </PolicyCard>

        <PolicyCard icon={LockKeyhole} title="5. A/1 infrastructure protection">
          <ul>
            <li>Never place passwords, API keys, private credentials, banking information, donor lists, participant rosters, private contracts, or admin secrets inside the public demo.</li>
            <li>Do not share source code, private operating documents, internal admin links, or access credentials without Cecil’s authorization.</li>
            <li>Use least access: each person gets only the access needed for their role.</li>
            <li>Keep the tablet locked when unattended. Do not leave an open participant record visible in public.</li>
            <li>Report a lost tablet, suspicious access, accidental disclosure, or wrong-recipient share immediately.</li>
          </ul>
        </PolicyCard>

        <PolicyCard icon={TabletSmartphone} title="6. Tablet operator standard">
          <ol>
            <li>Start with a clean demo participant.</li>
            <li>Explain that this is a controlled test build.</li>
            <li>Use nickname / Power Name and non-sensitive answers.</li>
            <li>Ask before using microphone, camera, photo, video, or recording features.</li>
            <li>Do not photograph or screen-record a participant without the approved permission.</li>
            <li>After testing, review what was saved and reset the device when required.</li>
          </ol>
        </PolicyCard>

        <PolicyCard icon={EyeOff} title="7. No exploitation / no foolishness standard">
          <p>A/1 Suppliers does not use the tablet to embarrass, pressure, manipulate, profile, exploit, or publicly expose participants.</p>
          <ul>
            <li>Respect dignity and age-appropriate boundaries.</li>
            <li>No discriminatory treatment.</li>
            <li>No selling participant data.</li>
            <li>No unnecessary surveillance.</li>
            <li>No posting a participant’s information or content just because it was entered into the app.</li>
            <li>No staff member uses A/1 systems for personal side business, retaliation, harassment, or unauthorized access.</li>
          </ul>
        </PolicyCard>

        <PolicyCard icon={ShieldCheck} title="8. Incident response">
          <p>If something goes wrong, do not hide it. Stop the exposure, preserve the facts, and notify leadership.</p>
          <div className={styles.incidentSteps}>
            <span>STOP ACCESS</span><span>DOCUMENT WHAT HAPPENED</span><span>NOTIFY CECIL / AUTHORIZED LEAD</span><span>SECURE OR RESET DEVICE</span><span>ASSESS WHO MUST BE NOTIFIED</span><span>FIX THE CONTROL</span>
          </div>
        </PolicyCard>
      </div>

      <section className={styles.legalBox}>
        <h2>Before real participant launch</h2>
        <p>
          This safeguard screen is an internal operating standard, not a substitute for the final public Privacy Policy, Terms/Acceptable Use, parent/guardian consent, participant intake, media release, data-retention policy, vendor/privacy review, or legal review. Those items must be completed before A/1 Suppliers turns this demo into a real personal-data collection system for minors.
        </p>
      </section>
    </Shell>
  );
}

function PolicyCard({ icon: Icon, title, children }) {
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
