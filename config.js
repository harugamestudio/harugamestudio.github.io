/* =====================================================================
   HARU GAME STUDIO — SITE CONFIG
   Edit everything here. No need to touch HTML/CSS/JS.
   ===================================================================== */

const SITE = {
  name: "HaruGameStudio",
  logo: "assets/logo.png",          // put your logo here (png/svg)
  tagline: "Dark tales. Twisted games. Crafted in the shadows.",
  heroButton: "Enter the Crypt",

  about: {
    title: "About the Studio",
    text: [
      "HARU Game Studio is a one-person studio. Every project here — from the first line of code to the last drop of blood — is crafted solo.",
      "Mostly dark, atmospheric horror games, but also apps and tools born along the way.",
      "Files are hosted on trusted third-party platforms — pick the mirror that works best for you."
    ]
  },

  // Links in "Contacts" section. Remove lines you don't need.
  socials: [
    { name: "itch.io",  url: "https://ruslanharu.itch.io" },
    { name: "Discord",  url: "https://discord.gg/h9SFjcgpsk" },
    { name: "Patreon",  url: "https://patreon.com/ruslanharu" },
    { name: "X",        url: "https://x.com/ruslanharu" }
  ],

  /* ---------- NEWS / DEVLOG ----------
     Fetched automatically from itch.io RSS (+ Patreon) by a GitHub Action
     (.github/workflows/news.yml) into data/news.js every 6 hours.
     Add a feed for every project that has a devlog on itch.io. */
  news: {
    title: "Chronicles",
    count: 6,                       // how many news to show on the home page
    feeds: [
      { project: "Sacred Lust", url: "https://ruslanharu.itch.io/sacred-lust/devlog.rss" },
      { project: "GOREGASM",    url: "https://ruslanharu.itch.io/goregasm/devlog.rss" }
    ],
    /* Patreon posts are added automatically (titles only) when the
       PATREON_TOKEN secret is set on GitHub — see README.md.
       You can also add any news by hand here: */
    manual: [
      // { source: "patreon", title: "New Beta Build", link: "https://www.patreon.com/posts/...", date: "2026-11-22" },
    ]
  },

  /* ---------- SUPPORT BLOCK ---------- */
  support: {
    title: "Support the Crypt",
    text: "I make these games alone. Your support keeps the candles burning and the updates coming.",
    perks: [
      "Early access to alpha & beta builds",
      "Exclusive content and outfits",
      "Your ideas shape future updates",
      "Behind-the-scenes devlogs"
    ],
    buttons: [
      { name: "Patreon", url: "https://patreon.com/ruslanharu" }
      // ,{ name: "Ko-fi", url: "https://ko-fi.com/your-name" }
    ]
  },

  /* ---------- DISCORD WIDGET ----------
     Only the invite code is needed (the part after discord.gg/).
     Online / members counters are loaded live. */
  discord: {
    invite: "h9SFjcgpsk",
    title: "Join the Coven",
    text: "Feedback, bug reports, early news and dark chatter."
  },

  /* ---------- PRESS KIT (presskit.html) ---------- */
  press: {
    developer: "HARU Game Studio (RuslanHaru)",
    founded: "2025",
    teamSize: "Solo developer",
    email: "",                      // contact email for press, e.g. "press@example.com"
    description: "HARU Game Studio is a solo indie developer creating dark, atmospheric horror games with mature themes, built in Unreal Engine.",
    logoFiles: [                    // downloadable logo files
      { name: "Logo (PNG)", url: "assets/logo.png" }
    ]
  },

  footer: "All souls reserved."
};

/* ---------------------------------------------------------------------
   PROJECTS
   id      : short name used in the game page link: game.html?id=sacred-lust
   type    : "Game" | "App" | "Tool" | ... (filters appear with 2+ types)
   available: false = dark locked card, nothing clickable
   lockedText: text on a locked card
   cover   : card image (3:4), e.g. "assets/covers/sacred-lust.jpg"
   status / age / version / description / tags : shown on the card
   downloads: one entry per platform
     platform: "windows" | "linux" | "android" | "macos" | "web"
     command : (optional) console command shown first, with a Copy button
               one command:  command: "curl -fsSL https://... | bash"
               several:      command: [ "git clone https://github.com/...", "cd repo && ./install.sh" ]
     mirrors : list of links for this platform (e.g. GitHub page, itch.io)

   page    : GAME PAGE (game.html?id=...). Remove "page" = no game page.
     banner     : big title image on top (game logo), "" = text title
     about      : paragraphs
     features   : [ ["Title", "text"], ... ]
     trailer    : YouTube video ID (the part after watch?v=), "" = none
     info       : any extra rows for the info table
     requirements: minimum system requirements, empty = hidden
     warning    : content warning text, "" = none
     changelog  : [ { version, date, notes } ]
     itch       : link to the itch.io page
   --------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "sacred-lust",
    title: "Sacred Lust",
    type: "Game",
    available: true,
    cover: "assets/covers/sacred-lust.jpg",
    status: "Released",
    age: "NSFW",
    version: "v1.0.1",
    description: "First-person horror-erotica survival. Sneak through cursed, procedurally generated halls, hide from Lily and find a way out — danger lurks around every corner.",
    tags: ["Horror", "Survival", "Stealth"],
    downloads: [
      {
        platform: "windows",
        label: "Download for Windows",
        mirrors: [
          { name: "itch.io", url: "https://ruslanharu.itch.io/sacred-lust" },
          { name: "f95zone", url: "https://f95zone.to/threads/sacred-lust-v1-0-1-haru-game-studio-ruslanharu.246411/" }
        ]
      }
    ],
    page: {
      itch: "https://ruslanharu.itch.io/sacred-lust",
      banner: "https://img.itch.zone/aW1nLzIwNTc3NDY5LnBuZw==/original/8qhIqK.png",
      about: [
        "Sacred Lust is a horror-erotica game set in a cursed Gothic church, where danger and desire intertwine. Collect relics while avoiding the seductive yet terrifying Priestess of Temptation, who watches, tempts and hunts you at every turn.",
        "A blend of stealth, suspense and temptation, where your choices determine your survival. With every step the church unveils its dark secrets, luring you deeper into its sinister embrace."
      ],
      features: [
        ["Immersive Locations", "A hauntingly beautiful Gothic church with hidden rooms, crypts and dark secrets — and new environments like the eerie Cave."],
        ["Dynamic Gameplay", "Master stealth, strategy and survival in the Priestess' deadly domain."],
        ["Unique Visuals", "Gothic elegance meets seductive horror: detailed models, atmospheric lighting, crafted animations."],
        ["NSFW Content", "Intense, interactive animations that only end when you choose to break free."],
        ["Customization", "Unlock and equip costumes, including exclusive Patreon outfits."]
      ],
      trailer: "",
      info: [
        ["Genre", "Survival, Action"],
        ["Made with", "Unreal Engine"],
        ["Session", "About an hour"],
        ["Language", "English"],
        ["Input", "Keyboard, Mouse"]
      ],
      requirements: {
        // OS: "Windows 10 64-bit",
        // CPU: "",
        // RAM: "8 GB",
        // GPU: "",
        // Storage: "2 GB"
      },
      warning: "Contains sexual content and horror themes. 18+ only.",
      changelog: [
        { version: "1.0.1", date: "2025-06-12", notes: "Performance patch: optimization and stability, especially on lower-end hardware." },
        { version: "1.0",   date: "2025-06-09", notes: "Full release — the biggest update of the game." },
        { version: "0.9",   date: "2025-05-10", notes: "“Shadows of Her Soul” — Chapter 2: Portals of Sin." },
        { version: "0.8",   date: "2025-04-19", notes: "“Whispers of the Church” — Chapter 1 story mode." },
        { version: "0.7",   date: "2025-04-05", notes: "“Whispers of Temptation” — new Whispering Dust trap." },
        { version: "0.6",   date: "2025-03-28", notes: "“Prepare for the Descent” — new horror sound effects." },
        { version: "0.5",   date: "2025-03-22", notes: "Procedural level generation." },
        { version: "0.0.1", date: "2025-02-01", notes: "First public version." }
      ]
    }
  },
  {
    id: "goregasm",
    title: "GOREGASM",
    type: "Game",
    available: true,
    cover: "assets/covers/goregasm.jpg",
    status: "Released",
    age: "NSFW",
    version: "v1.0",
    description: "Bloody retro wave shooter. Survive endless hordes in the Temple, unlock skills and abilities, and upgrade your hub between ever more brutal runs.",
    tags: ["Shooter", "Retro", "Roguelite"],
    downloads: [
      {
        platform: "windows",
        label: "Download for Windows",
        mirrors: [
          { name: "itch.io", url: "https://ruslanharu.itch.io/goregasm" },
          { name: "f95zone", url: "https://f95zone.to/threads/goregasm-v1-0-haru-game-studio.272747/" }
        ]
      }
    ],
    page: {
      itch: "https://ruslanharu.itch.io/goregasm",
      banner: "https://img.itch.zone/aW1nLzIzMjM0NjY2LnBuZw==/original/5agcIy.png",
      about: [
        "GOREGASM is a fast, brutal wave-based shooter soaked in gore, dark sensuality and chaotic power fantasy.",
        "The Temple is the last place where you can breathe. Outside its walls — only endless flesh, noise and violence. Survive as long as you can while the game pushes back harder every minute. Every run feeds your progression. Every death makes you stronger.",
        "Just one more run."
      ],
      features: [
        ["Relentless Wave Survival", "Escalating waves designed to overwhelm you — the longer you survive, the more chaotic it gets."],
        ["Build Your Power Mid-Run", "Pick new abilities during combat: stack projectiles, unleash magic, break the battlefield."],
        ["Permanent Progression", "Return to the Temple after each run to unlock upgrades and prepare for the next descent."],
        ["The Temple Hub", "A safe space between massacres: upgrade, unlock content, explore secrets."],
        ["Cinematic Ultimates", "Brutal cinematic attacks that freeze the moment."],
        ["Dark Seductive Horror", "Gore, disturbing enemies and NSFW elements in a strangely hypnotic atmosphere."]
      ],
      trailer: "nAIylHr8Ufw",
      info: [
        ["Genre", "Shooter, Action, Survival"],
        ["Made with", "Unreal Engine"],
        ["Session", "Days or more"],
        ["Language", "English"],
        ["Input", "Keyboard, Mouse"]
      ],
      requirements: {
        // OS: "Windows 10 64-bit",
        // CPU: "",
        // RAM: "",
        // GPU: "",
        // Storage: ""
      },
      warning: "Contains flashing lights, gore, sexual themes and disturbing imagery.",
      changelog: [
        { version: "R.1.0", date: "2026-11-16", notes: "GOREGASM is officially a finished project." },
        { version: "0.7",   date: "2026-07-11", notes: "Major new systems beyond combat, Photo Mode, reworked shader compilation." },
        { version: "0.1",   date: "2025-09-19", notes: "First public demo." }
      ]
    }
  },
  {
    id: "magic-cleanup",
    title: "Magic Cleanup",
    type: "Game",
    available: false,
    lockedText: "Coming Soon",
    cover: "assets/covers/magic-cleanup.jpg",
    status: "In Development",
    age: "SFW/NSFW",
    version: "v0.1.0",
    description: "Short description of Magic Cleanup.",
    tags: ["Casual", "Magic"],
    downloads: [
      {
        platform: "windows",
        label: "Download for Windows",
        mirrors: [
          { name: "itch.io",      url: "https://ruslanharu.itch.io/magic-cleanup" },
          { name: "Google Drive", url: "https://drive.google.com/your-link" }
        ]
      },
      {
        platform: "linux",
        label: "Download for Linux",
        command: "curl -fsSL https://raw.githubusercontent.com/harugamestudio/magic-cleanup/main/install.sh | bash",
        mirrors: [
          { name: "GitHub", url: "https://github.com/harugamestudio/magic-cleanup" }
        ]
      }
    ]
  }

  ,{
    id: "hgs-tools",
    title: "HGS Tools",
    type: "Tool",
    available: true,
    cover: "https://harugamestudio.github.io/hgs-tools/docs/screens/index.jpg",
    status: "Released",
    age: "",
    version: "Free · In browser",
    description: "Free browser tools for game developers: palettes, pixel upscaling, sprite sheets, icons, normal maps, SFX, names and lore. Nothing is uploaded.",
    tags: ["Graphics", "Audio", "Text"],
    downloads: [
      {
        platform: "web",
        mirrors: [
          { name: "Open HGS Tools", url: "https://harugamestudio.github.io/hgs-tools/" },
          { name: "GitHub",         url: "https://github.com/harugamestudio/hgs-tools" }
        ]
      }
    ],
    page: {
      itch: "",
      banner: "",
      about: [
        "HGS Tools is a free set of browser tools for game developers, made by HARU Game Studio.",
        "Everything runs right in your browser — no installs, no accounts, and nothing is uploaded anywhere."
      ],
      features: [
        ["Palette Forge", "Colour harmonies and locks, export to GPL / PNG."],
        ["Pixel Upscaler", "xBR, AI and Scale2x upscaling, batch export to ZIP."],
        ["Sprite Sheets", "Slice, pack and preview sprite sheets, export GIF."],
        ["Icon Forge", "One image → icons in every platform size."],
        ["Normal Maps", "Bevel, detail, live lighting preview and AO."],
        ["SFX Generator", "Shots, screams and creaks in one click."],
        ["Names & Lore", "Generator of demons, cults, saints and relics."]
      ],
      trailer: "",
      info: [
        ["Runs in", "Any modern browser"],
        ["Price", "Free"],
        ["Source", "Open on GitHub"]
      ],
      requirements: {},
      warning: "",
      changelog: []
    }
  }

  /* Example of a non-game project
  ,{
    id: "my-tool",
    title: "My Tool",
    type: "App",
    available: true,
    cover: "assets/covers/my-tool.jpg",
    status: "Released",
    age: "",
    version: "v1.0.0",
    description: "What this app does.",
    tags: ["Utility"],
    downloads: [
      { platform: "windows", mirrors: [ { name: "itch.io", url: "https://ruslanharu.itch.io/my-tool" } ] },
      { platform: "linux",   mirrors: [ { name: "itch.io", url: "https://ruslanharu.itch.io/my-tool" } ] }
    ]
  }
  */
];
