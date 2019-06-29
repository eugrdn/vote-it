export const url = ({location: {protocol, hostname, port}}: Window) =>
  `${protocol}//${hostname}:${port}`;
