# Japanese Reader

A mobile-focused offline-mode Japanese reader web app.

Link to web app: [japanese-reader.vercel.app](https://japanese-reader.vercel.app)

Built with [React](https://react.dev), [TypeScript](https://typescriptlang.org), [Next.js](https://nextjs.org), [TailwindCSS](https://tailwindcss.com), and [Zustand](https://github.com/pmndrs/zustand). Initialized with [create-t3-app](https://create.t3.gg).

## Features

- Paste text from clipboard
- Look up Japanese words with pitch accent, conjugation, and multiple readings
- Save and view text history
- Clear all text history
- Delete individual text history entries (long-press history entry on mobile, right-click history entry on desktop)
- Installable progressive web app that works entirely offline

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <img width="200" src="screenshots/reader-empty.png" alt="Empty reader screen" />
  <img width="200" src="screenshots/reader-text.png" alt="Reader with text" />
  <img width="200" src="screenshots/reader-single-definition.png" alt="Reader with single definition" />
  <img width="200" src="screenshots/reader-multiple-definitions.png" alt="Reader with multiple definitions" />
  <img width="200" src="screenshots/reader-same-definitions-different-kanji.png" alt="Reader with same definition and different kanji" />
  <img width="200" src="screenshots/history.png" alt="History page" />
  <img width="200" src="screenshots/history-clear-all.png" alt="Clear all history modal" />
  <img width="200" src="screenshots/history-longpress-delete.png" alt="Delete a single history entry with long-press on mobile or right-click on desktop" />
</div>

## Credits

- [Pleco](https://pleco.com) for design inspiration
- [JMdict/EDICT](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project) for the word dictionary
- [Rikaikun](https://github.com/melink14/rikaikun) for the formatted word dictionary, word dictionary index, verb deconjugation code, and other pieces of code
- [Kanjium](https://github.com/mifunetoshiro/kanjium) for the pitch accent dictionary
