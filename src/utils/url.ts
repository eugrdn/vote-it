export const url = ({protocol, hostname, port}: Partial<Location>) =>
  `${protocol}//${hostname}:${port}`;
