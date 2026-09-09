# thewrongway-theme

A custom Eleventy theme rebuilding the layout of thewrongway.com as a static,
Markdown-based blog: masthead, sidebar (profile, pages, categories, recent
posts, archives, blogroll), and a journal-style post list with date / title /
subtitle.

## What's real vs. placeholder

- The **layout, sidebar widgets, categories, and archive** are fully working —
  built from the actual structure of thewrongway.com.
- The **7 sample posts** in `content/blog/` use the real titles, subtitles,
  dates, and rough categories pulled from the live site, but the **post
  bodies are placeholder text** — swap in your real writing.
- The **avatar and logo** in `img/` are simple placeholder SVGs — replace
  them with your real images (any format works; just update the paths in
  `_data/site.js` and the header/sidebar templates if you rename the files).
- Colors, fonts, and exact spacing are a fresh design inspired by the
  original's structure and tone — not a pixel-for-pixel CSS copy, since that
  wasn't recoverable from the live page. Easy to retune — see below.

## Getting this into your GitHub repo

Easiest path: download and unzip this on your computer, then on GitHub go to
your `thewrongway-blog` repo → **Add file → Upload files**, and drag the
entire unzipped folder's contents in. GitHub preserves the folder structure.
This will overwrite the starter files with this theme. Commit, and Cloudflare
rebuilds automatically.

## Customizing

- **Site info, nav, social links, blogroll:** edit `_data/site.js`
- **Add/edit a post:** add a `.md` file to `content/blog/` with front matter
  like:
  ```yaml
  ---
  layout: post.njk
  title: "Your Title"
  subtitle: "Optional subtitle"
  date: 2027-03-14
  tags:
    - posts
    - Travel
  ---
  ```
  The first tag should stay `posts`; any other tags become categories.
- **Colors and fonts:** all in `css/style.css`, under the `:root` block at
  the top (`--paper`, `--ink`, `--accent`, etc.)
- **About / Disclaimer pages:** edit `content/about.md` and
  `content/disclaimer.md`

## Previewing locally (optional)

Only needed if you want to check changes before pushing. Requires Node.js:

```
npm install
npm run serve
```

Then open the local URL it prints. Not required for your normal workflow —
Cloudflare builds it for you on every push either way.
