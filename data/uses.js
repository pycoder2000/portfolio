const categories = [
  {
    name: 'Hardware',
    items: [
      {
        title: 'MacBook Pro (13", 2021)',
        description:
          'The M1 chip is just amazing. Plus, 8 GB RAM, 8 core CPU, 8 core GPU and 256 GB storage.',
        url: 'https://a.co/d/4eTu8wI',
      },
      {
        title: 'Apple Magic Mouse',
        description:
          'It definitely has some lapses but still it has the best compatibility with a Mac.',
        url: 'https://a.co/d/eBbAHVx',
      },
      {
        title: 'HP 27er Full HD Monitor ',
        description: 'I love this display. It gets super bright.',
        url: 'https://a.co/d/9cV0Vol',
      },
      {
        title: 'Home Office Ergonomic Chair',
        description: 'I sit all day, so I might as well get a good chair.',
        url: 'https://a.co/d/08Lsygc',
      },
      {
        title: 'Apple Magic Keyboard Wireless',
        description:
          'My preferred wireless keyboard with a 65% compact layout.',
        url: 'https://a.co/d/dntL3Wl',
      },
    ],
  },
  {
    name: 'Software',
    items: [
      {
        title: 'VSCode',
        description: "The first and last code editor I'll ever use.",
        url: 'https://code.visualstudio.com',
      },
      {
        title: 'Raycast',
        description: 'The best productivity app for Mac. Do give this a try.',
        url: 'https://www.raycast.com/',
      },
    ],
  },
  {
    name: 'Coding',
    items: [
      {
        title: 'VSCode',
        description:
          'After using Sublime for many years, I moved to VSCode like everybody else.',
        url: 'https://code.visualstudio.com',
      },
    ],
  },
  {
    name: 'Note-Taking',
    items: [
      {
        title: 'Notion',
        description:
          "It has a minor learning curve but once you understand how to use it there's no going back.",
        url: 'https://www.notion.so/',
      },
      {
        title: 'PanWriter',
        description: 'My go to app for distraction-free writing.',
        url: 'https://panwriter.com/',
      },
    ],
  },
  {
    name: 'Terminal',
    items: [
      {
        title: 'iTerm2',
        description:
          'Much better than the default terminal. Plus you can supercharge it with the <a href="https://gist.github.com/pycoder2000" target="_blank">dotfiles</a> I have provided',
        url: 'https://iterm2.com/',
      },
      {
        title: 'Oh My ZSH',
        description:
          "A collection of ZSH plugins that you install once and you're ready to go.",
        url: 'https://ohmyz.sh',
      },
    ],
  },
  {
    name: 'Apps',
    items: [
      {
        title: 'Mirosoft Edge',
        description: 'My browser of choice.',
        url: 'https://www.microsoft.com/en-us/edge',
      },
      {
        title: 'Raycast',
        description:
          'The best productivity app for Mac which replaces Spotlight. Do give this a try.',
        url: 'https://www.raycast.com/',
      },
      {
        title: 'Dozer',
        description:
          "Perfect way to declutter and manage the macOS menubar (plus it's free).",
        url: 'https://github.com/Mortennn/Dozer',
      },
      {
        title: 'Kap',
        description: 'I use it for screensharing',
        url: 'https://getkap.co/',
      },
      {
        title: 'Rectangle',
        description: 'My choice of window management app',
        url: 'https://rectangleapp.com/',
      },
      {
        title: 'Plume',
        description: 'Quick way to jot down notes directly from Mac menubar',
        url: 'https://apps.apple.com/us/app/plume-light-menubar-note/id1513115773?mt=12',
      },
    ],
  },
  {
    name: 'Audio',
    items: [
      {
        title: 'Sony WH-1000XM4',
        description:
          'Best headphones money can buy. The only issue is that the ears get heated up after continuos usage.',
        url: 'https://electronics.sony.com/audio/headphones/headband/p/wh1000xm4-b',
      },
      {
        title: 'Galaxy Buds 2 Pro',
        description:
          'By far the best earphones I have ever used. The noise cancellation is pretty good.',
        url: 'https://www.samsung.com/us/mobile-audio/galaxy-buds2-pro/',
      },
      {
        title: 'Logitech H390 Wired Headset',
        description: 'I use it mostly for home office. Decent sound.',
        url: 'https://a.co/d/d0AjQhm',
      },
    ],
  },
  {
    name: 'Reading',
    items: [
      {
        title: 'Kindle Paperwhite 11th Gen',
        description:
          "It' the perfect kindle for light reading. Portable enough to fit in your pocket.",
        url: 'https://a.co/d/4ISrXxM',
      },
    ],
  },
]

export default categories
