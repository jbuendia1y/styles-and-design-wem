const generateTemplate = (directory) => `
extends ../layouts/main.pug
block content
include:markdown-it(html) ${directory}
`;
