import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

import { MODULE_ID } from './ModuleInfo';

export default function ThemeCustomizer() {
  const { enabled, current, channelID, theme } = useSelector(
    (state) => state[MODULE_ID],
  );

  const currentTheme = theme[channelID] || theme[current];
  useEffect(() => {
    if (!enabled) return null;
    if (!currentTheme) return null;

    document.documentElement.classList.add('theme-custom');

    return () => document.documentElement.classList.remove('theme-custom');
  }, [currentTheme, enabled]);

  if (!enabled) return null;
  if (!currentTheme) return null;
  return ReactDOM.createPortal(
    <style>
      {`
        html.theme-custom {
          ${Object.keys(currentTheme)
            .map((key) => `--color-${key}: ${currentTheme[key]} !important;`)
            .join('\n')}
        }
      `}
    </style>,
    document.head,
  );
}
