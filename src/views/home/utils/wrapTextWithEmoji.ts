import emojis from 'emojis';

export const wrapTextWithEmoji = (text: string, leftEmoji: string, rightEmoji: string) =>
  `${emojis.unicode(leftEmoji)}${text}${emojis.unicode(rightEmoji)}`;
