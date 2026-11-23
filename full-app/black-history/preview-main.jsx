import React from 'react';
import { createRoot } from 'react-dom/client';
import HistoryLearningStudio from './HistoryLearningStudio.jsx';
import './preview.css';

createRoot(document.getElementById('history-preview-root')).render(
  <React.StrictMode>
    <main className="yep-history-preview">
      <header className="yep-history-preview-banner">
        <div><span>A/1 SUPPLIERS</span><strong>YEP | BUILDERS & OWNERS</strong></div>
        <span>DEVELOPMENT PREVIEW · NO YOUTH DATA COLLECTED</span>
      </header>
      <HistoryLearningStudio />
      <footer>YEP full-app curriculum development · Not part of the current proof of concept · No verified FINISHER XP awarded</footer>
    </main>
  </React.StrictMode>
);