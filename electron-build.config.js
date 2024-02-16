module.exports = {
  productName: 'NextSketch',
  appId: 'com.NextSketch|electron.app',
  directories: {
    output: 'dist-electron', //where buildt application files will be output, same as main in package.json
    buildResources: ['server', 'images'], //additional resources
    app: 'src', //main code is located
  },
  asar: true, //enble asar package
  files: [
    'dist-electron/**/*', // Include main process files
    'images/**/*',
    'server/**/*', // Include additional resources
    'package.json',
  ],
  build: {
    mac: {
      icon: 'images/nslogo.png',
      category: 'public.app-category.productivity',
      target: {
        target: 'default',
        arch: ['x64', 'arm64'],
      },
    },
    dmg: {
      sign: false,
      background: null,
      backgroundColor: '#FFFFFF',
      window: {
        width: '400',
        height: '300',
      },
      contents: [
        {
          x: 100,
          y: 100,
        },
        {
          x: 300,
          y: 100,
          type: 'link',
          path: '/Applications',
        },
      ],
    },
    win: {
      icon: 'images/nslogo.ico',
      target: [
        {
          target: '--windows',
          arch: ['x64'],
        },
      ],
    },
    linux: {
      icon: 'images/nslogo.png',
      target: ['deb', 'rpm', 'snap', 'AppImage'],
    },
    extraResources: [
      'node_modules/@fortawesome/**/*',
      'node_modules/prismjs/**/*',
      'node_modules/@mui/**/*',
    ],
  },
};
