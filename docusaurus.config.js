// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Next Hat Docs',
  tagline: '_Our code is open_',
  url: 'https://docs.next-hat.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.webp',
  trailingSlash: false,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nxthat', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: false,
        docs: {
          path: 'docs',
          routeBasePath: '/',
          breadcrumbs: true,
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/nxthat/documentation/tree/master/',
          async sidebarItemsGenerator({
              defaultSidebarItemsGenerator,
              ...args
            }) {
              let sidebarItems = await defaultSidebarItemsGenerator(args)
              sidebarItems = sidebarItems.map((item) => {
                // @ts-ignore
                item.items = item?.items?.map((subItem) => {
                  if (subItem.type === 'category' && subItem.label === 'Daemon') {
                    /// Add version reference to the sidebar for the daemon
                    subItem.items.push({
                      type: 'link',
                      label: 'v0.8 reference (latest)',
                      href: '/references/nanocl/daemon/v0.8',
                    })
                  }
                  return subItem;
                }) || [];
                return item;
              });

              return sidebarItems.filter(
                (item) =>
                  // @ts-ignore
                  // This makes sure that the landing pages are not duplicated in the sidebars
                  item.id !== 'guides/summary' && item.id !== 'setups/summary' && item.id !== 'references/summary'
              )
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-L5PJ2B6W8P',
          anonymizeIP: false,
        },
        googleAnalytics: {
          trackingID: 'G-L5PJ2B6W8P',
          anonymizeIP: false,
        },
      }),
    ],
    [
      'redocusaurus',
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        config: path.join(__dirname, 'redocly.yaml'),
        specs: [{
          id: 'nanocld-latest',
          spec: 'static/specs/nanocld/0.8.yaml',
        }],
        theme: {
          /**
           * Highlight color for docs
           */
          primaryColor: '#1890ff',
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content: 'Next Hat, next, hat, next-hat, next hat, next, hat, documentation, doc, next hat doc, next doc, hat doc, nanocl, docker, container, cluster, replication, hight avaibility, daemon, vpn, ipsec, ikev2, cloud, cloud-hybride, hybrid, devops, blazing fast, cicd, qemu, vm, virtual machine',
        },
      ],
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Next Hat Docs',
        logo: {
          alt: 'Next Hat logo',
          src: 'img/logo.webp',
          width: '32',
          height: '32',
        },
        items: [
          {
            type: 'doc',
            position: 'left',
            docId: 'guides/summary',
            label: 'Guides',
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'setups/summary',
            label: 'Setups',
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'references/summary',
            label: 'References',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/nxthat',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/WV4Aac8uZg',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nxthat',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Next Hat and Contributors.`,
      },
      prism: {
        additionalLanguages: ['nginx', 'yaml', 'rust', 'json', 'toml', 'docker'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
