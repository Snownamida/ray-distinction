**English** | [中文](README.zh-CN.md)

# 🐟 Skate, Ray & Manta — Tell Them Apart

A lightweight, fun **marine-biology quiz game**: look at a photo, guess the species, and learn in seconds how to tell apart three look-alike cartilaginous fish —
**skate, stingray and eagle ray**.

> Play online: <https://ray.snownamida.top/>

![Game screenshot](screenshot.png)

## 🎯 Why this project

Skates, stingrays and eagle rays look remarkably similar and are often lumped together as "devil fish" or simply "rays".
This project uses a **look at a real photo → pick one of three → instant knowledge card** loop
so you can learn the key differences in **body shape, tail and dorsal fins** while playing.

## 🕹️ How to play

1. Open the page and study the photo in the middle (note the body shape, the tail, and whether there are dorsal fins / a venomous spine).
2. Pick what you think it is from the three buttons below: **Skate / Stingray / Eagle Ray**.
3. After answering, a **knowledge card** pops up at the bottom explaining "why it's that one".
4. Tap **Next** to keep going — a streak of correct answers builds up a 🔥 combo.
5. Want to show off? Tap **Share score** to share in one click. Want to support the author? Tap ☕ to buy me a coffee.

## ✨ Features

- 📸 Real-photo question bank, randomized questions
- 🔥 Combo counter + 🏆 **all-time best combo** (saved locally via `localStorage`)
- 📊 Live session score and accuracy
- 📖 A **knowledge feedback card** after each question (compiled from public marine-biology sources)
- 🔗 **One-tap score sharing** (native share sheet / copy to clipboard)
- 📱 Mobile-friendly (responsive layout, large touch buttons, safe-area support)
- 🔎 SEO-optimized (localized title/description, Open Graph, JSON-LD, crawlable knowledge article)
- ☕ A discreet sponsorship entry point

## 🔬 Quick cheat sheet

| | Skate | Stingray | Eagle Ray |
|---|---|---|---|
| Body | Diamond / heart-shaped | Round disc | Distinct head, with head fins |
| Tail | Thick, fleshy, **no spine** | Thin and whip-like, **often venomous spine** | Thin and long, usually with a spine |
| Dorsal fins | Two small fins near the tail | Reduced / absent | — |
| Behavior | Egg-laying, rests on the seabed | Live-bearing, rests on the seabed | "Flies" through the water column |

> In one line: **thick tail with two dorsal fins is a skate, whip tail with a venomous spine is a stingray, and the one with wings "flying" through the water is an eagle ray.**

## 🛠️ Tech stack

- `Vite` + `React 18` + `Tailwind CSS v4`, precompiled at build time (previously used in-browser Babel compilation, which downloaded ~3 MB of dependencies on first paint; the build output is now around 50 KB gzipped)
- Static assets live in `public/` (images, audio); the build output goes to `dist/`
- Hosted on Cloudflare Pages (build command `npm run build`, output directory `dist`)

## 💻 Run locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build -> dist/
```

## 📄 Media & copyright

- **Code**: MIT License © Snownamida (see [`LICENSE`](LICENSE)).
- **Images (`images/`) and audio (`audio/`)**: sourced from the web, used for educational and demonstration purposes only.
  They **may be protected by their respective authors' copyright**, which remains with the original authors and is not covered by this project's MIT license.
  If you are the rights holder of any asset and would like attribution or removal, please contact me via the link below.

## 🙌 Support the author

If this little game helped you, feel free to buy me a coffee: <https://ko-fi.com/snownamida>
