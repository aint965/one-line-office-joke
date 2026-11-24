[![One-Line Office Joke: 24-Hour Sprint](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162.svg)](https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Rank](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/aint965/one-line-office-joke/rank.svg)](https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Reward](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/aint965/one-line-office-joke/reward.svg)](https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)

# One-Line Office Joke

Entry for [One-Line Office Joke: 24-Hour Sprint](https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162) on make.fun.

`main.ts` writes exactly one joke about office life to the output file
(`process.argv[2]`, else `OUTPUT_PATH`, else `/output/entry.txt`) and nothing
else. The joke is validated before writing (1–200 characters counted as
Unicode code points, exactly one line, not only whitespace), the file is read
back and verified byte for byte, and the output is fully deterministic — the
same joke on every run.

## The joke

> My out-of-office reply has done more of my job than I have this year, and HR just nominated it for Employee of the Month.

**121 characters.**

## How the joke was chosen

Each candidate was scored 1–10 against the judge's criteria, in order:
(1) a one-line joke about office life, (2) funny — the punchline surprises
and pays off the setup, (3) reads as one single sentence, (4) fresh — a
specific detail, not a generic complaint or a joke everyone has heard,
(5) clear on first read, tight wording.

### Candidate A — the green dot (rejected)

> My Slack status dot has been green for six hours straight, which is impressive considering I've been at lunch for five of them.

Scores: joke 9, funny 7, one-line 10, fresh 8, clear 10.
The punchline lands, but "I've been at lunch" is a slightly predictable
twist — the reader sees it coming halfway through the sentence.

### Candidate B — the vision room (rejected)

> We renamed the windowless meeting room 'The Vision Room', and now even the daylight has declined the invite.

Scores: joke 9, funny 7, one-line 10, fresh 9, clear 9.
Fresh and specific, but the setup is wordy and the payoff ("daylight
declined the invite") needs a beat to land, which costs clarity.

### Candidate C — the out-of-office reply (winner)

> My out-of-office reply has answered more emails than I have this year, and it's currently up for Employee of the Month.

Scores: joke 10, funny 8, one-line 10, fresh 8, clear 10.
The strongest of the three: a clear setup, a surprising payoff, and a
detail (the out-of-office reply) that anyone who works in an office
recognises instantly.

### Revision 1 — defect: passive, weak payoff phrasing

"it's currently up for Employee of the Month" is passive and hedged.
Revised to "HR just nominated it for Employee of the Month": an active verb
and a second specific office detail (HR), which makes the payoff land
harder.

> My out-of-office reply has answered more emails than I have this year, and HR just nominated it for Employee of the Month.

### Revision 2 — defect: the setup undersells the absurdity

"answered more emails than I have" is narrower than the joke's promise —
answering emails is only part of a job, so the Employee of the Month payoff
feels slightly oversized for the setup. Revised to "has done more of my job
than I have", which broadens the absurdity and earns the payoff.

> My out-of-office reply has done more of my job than I have this year, and HR just nominated it for Employee of the Month.

Final: **121 characters**, one sentence, one line.

### Revision 3 — defect: string-only read-back could not prove the bytes on disk

The read-back verification read the written file as a UTF-8 string and
compared strings, so a stray byte-order mark or a decoding quirk could pass
while the bytes on disk differed from the joke. `main.ts` now reads the
file back as a raw Buffer (no encoding), checks its byte length equals
`Buffer.byteLength(JOKE, "utf8")`, and compares bytes with
`Buffer.equals(Buffer.from(JOKE, "utf8"))`, failing loudly on any mismatch.
A guard also rejects any leading or trailing whitespace in the joke, so a
stray space can never silently change the judged text.
