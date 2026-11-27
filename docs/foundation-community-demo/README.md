# Five minutes with Quest Buddy

Use a fresh browser profile on the shared tablet and enter a fictional power name such as **Robin**. Open the preview online once before the meeting. Keep the same browser and preview address when reopening a saved session.

| Time | Facilitator and learner |
| ---|---|
| 0:00–0:50 | Select **Ages 7–10**, acknowledge the sample-data notice, and start the YEP introduction. Tap SEE, THINK, TRY and GROW to explore the messy-table example. Tap **Hear lesson**. Let the child make the four first check-in choices and open **A Better Lunch Line**. |
| 0:50–2:15 | Play Quest Buddy’s lunch-line question. Tap **Show me** to view an example, then **Hide example**. For the sample run, choose **The line is long**, **Both students and workers**, and **Open a second line**. Try **Say the line is fixed without checking** and read the clue. Return to Program Home, refresh, and reopen Daily Quest. Revise the answer by choosing the small test with a cafeteria worker. At the art table, choose the teacher-assisted comparison. For a fictional practice reflection, enter “I would check how long it takes to find the glue.” Save the quest. |
| 2:15–3:00 | Open **S.T.E.M.Sin**. Browse the tools, then tap **Try Sorting Tray**. Make a prediction, tap **Show What Changes**, and examine the illustrated result. Tap **Explain What Happened**, select **Compare before and after**, and save the proof. |
| 3:00–3:40 | Open **Mirror Results → Start My Mirror**. Answer the four questions about what caught your attention, what you explored, what interests you, and what help you want. Tap **Save My Check-In**. Read one saved answer together and use it to pick a FINISHER action. |
| 3:40–4:35 | For **Spot a Helpful Idea**, look around the meeting table with the child, notice a small problem, explain one helpful idea, and say what you would try next. Mark each step after doing it together. Tap **Finish My Mission**, write a sentence in the learner’s own words, and submit the reflection. |
| 4:35–5:00 | Open **Program Home → Facilitator tools · this tablet only → Admin Review**. Point to Robin’s actual choices, clue attempts, transfer reflection, tool and test plan, Mirror answers, mission and final reflection. To review the original work, reopen Daily Quest and tap **Review My Response**. |

## Review materials

[Daily Quest](foundation-daily-quest.png) · [S.T.E.M.Sin](foundation-stem.png) · [Mirror](foundation-mirror.png) · [FINISHER](foundation-finisher.png) · [Play, stop, replay and leave mid-line (MP4 with audio)](quest-buddy.mp4)

The recording captures a real browser tab and the audio played by its coach. The first line uses a locally synthesized, generic Flite narrator. Its mouth poses follow the clip’s phoneme boundaries and return to the resting smile during the pause and after “wait.” Other clips use a speaking indicator. Reduced motion keeps the face still. The optional device voice on the first check-in uses the browser’s speech engine.

Cecil can supply his approved reference portrait as `public/coach/cecil-trimble-approved.webp`. Building with that file selects the portrait across the four activities. A still portrait uses a speaking indicator. Cecil gives final likeness approval and would need to approve any specific recording used as his voice.

## Run the production build locally

From the review branch, run these commands, then open http://localhost:4173 in the same browser for each rehearsal.

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## What was checked

The four portrait-tablet screenshots show the same guide above each activity, with the answer controls visible below or reachable by scrolling. The screen recording shows the mouth opening and closing on the first question, coming to rest, restarting on replay, and stopping when the learner leaves mid-line. It was recorded from the local production build with a fictional profile.

Offline speech recognition of the recording transcribed the full first play as “look at the lunch line where do kids have to wait.” The capture contains the browser’s actual audio output. A human listening check for naturalness and classroom volume, a hands-on check on the meeting tablet, and Cecil’s likeness approval remain open.

The browser session exercises a weak answer and revision, a partial draft across Home and refresh, a saved Mirror check-in, a FINISHER checklist and written reflection, and Admin Review. It resubmits the finished mission and compares the complete saved session. A separate offline check reopens Foundation after an online visit, plays the cached lunch-line instruction with reduced motion, and resumes the saved people-choice step.
