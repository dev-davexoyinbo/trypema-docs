export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'Trypema'
  },
  header: {
    title: 'Trypema',
    to: '/',
    // Optional logo (leave empty to render text title).
    logo: {
      alt: 'Trypema',
      light: '/trypema-logo.webp',
      dark: '/trypema-logo-light.webp'
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/dev-davexoyinbo/trypema',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-rust',
      'to': 'https://docs.rs/trypema',
      'target': '_blank',
      'aria-label': 'docs.rs'
    }, {
      'to': 'https://crates.io/crates/trypema',
      'target': '_blank',
      'aria-label': 'crates.io'
    }]
  },
  footer: {
    credits: `Trypema • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/dev-davexoyinbo/trypema',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Links',
      edit: 'https://github.com/dev-davexoyinbo/trypema-docs/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/dev-davexoyinbo/trypema',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'API docs (docs.rs)',
        to: 'https://docs.rs/trypema',
        target: '_blank'
      }]
    }
  }
})
