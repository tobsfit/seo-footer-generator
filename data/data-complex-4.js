export default {
  blocks: [
    {
      type: "header",
      data: {
        text: "You can write your content here. Shortcut headline: <mark class=\"cdx-marker\">CMD+SHIFT+H</mark>",
        level: 2
      }
    },
    {
      type: "header",
      data: {
        text: "Quam lacus suspendisse faucibus interdum posuere lorem",
        level: 3
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      "type" : "image",
      "data" : {
          "url" : "https://via.placeholder.com/750x400/2cc36b/FFFFFF",
          "caption" : "Image caption",
          "withBorder" : true,
          "withBackground" : false,
          "stretched" : false
      }
    },
    {
      type: "header",
      data: {
        text: "Lorem ipsum dolor sit amet",
        level: 2
      }
    },
    {
      type: "header",
      data: {
        text: "Quam lacus suspendisse faucibus interdum posuere lorem",
        level: 3
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      type: 'list',
      data: {
        items: [
          'Shortcut for lists: <mark class=\"cdx-marker\">CMD+SHIFT+L</mark>',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          'Duis aute irure dolor',
          'Excepteur sint occaecat cupidatat',
        ],
        style: 'unordered'
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Duis aute irure dolor <mark class=\"cdx-marker\">in reprehenderit</mark>. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      type: 'paragraph',
      data: {
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <a href="#">labore</a> sunt in <a href="#">culpa</a> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      }
    },
    {
      type: 'delimiter',
      data: {}
    },
    {
      type: 'paragraph',
      data: {
        text: 'Shortcut for divider above (* * *) <mark class=\"cdx-marker\">CMD+SHIFT+C</mark>'
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <a href="#">labore</a> sunt in <a href="#">culpa</a> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 😏'
      }
    },
  ]
};
