import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SiteTheme } from './sanity.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  applyTheme(theme: SiteTheme): void {
    const root = this.document.documentElement;

    const cssVarMap: Record<keyof SiteTheme, string> = {
      primaryColor:    '--color-primary',
      secondaryColor:  '--color-secondary',
      accentColor:     '--color-accent',
      backgroundColor: '--color-bg',
      surfaceColor:    '--color-surface',
      textColor:       '--color-text',
      headingFont:     '--font-heading',
      bodyFont:        '--font-body',
      borderRadius:    '--radius-base',
      spacing:         '--spacing-unit',
    };

    Object.entries(theme).forEach(([key, value]) => {
      const cssVar = cssVarMap[key as keyof SiteTheme];
      if (cssVar && value) {
        // Sanity color-input returns {hex, ...}, extraemos hex si es objeto
        const val = typeof value === 'object' ? (value as any).hex : value;
        root.style.setProperty(cssVar, val);
      }
    });

    this.loadGoogleFonts(theme.headingFont, theme.bodyFont);
  }

  private loadGoogleFonts(heading: string, body: string): void {
    const existing = this.document.getElementById('dynamic-fonts');
    if (existing) existing.remove();

    const fonts = [heading, body]
      .filter(Boolean)
      .map(f => f.replace(/\s+/g, '+'))
      .join('&family=');

    const link = this.document.createElement('link');
    link.id = 'dynamic-fonts';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`;
    this.document.head.appendChild(link);
  }
}
