import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { experience, formatPeriod } from '../data/cv';
import Experience from './Experience.astro';

// The renderer escapes ampersands; compare against escaped text.
const escapeAmpersands = (text: string): string => text.replace(/&/g, '&amp;');

describe('Experience section', () => {
  it('renders every role from the CV data', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Experience);

    for (const job of experience) {
      expect(html).toContain(escapeAmpersands(job.company));
      expect(html).toContain(escapeAmpersands(job.role));
      expect(html).toContain(formatPeriod(job.start, job.end));
      expect(html).toContain(job.summary.slice(0, 40));
    }
  });

  it('links companies that have a URL and highlights the current role', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Experience);

    expect(html).toContain('href="https://www.eneco.nl/en/about-us/"');
    expect(html).toContain('Aug 2024 – present');
    expect(html).toContain('Tech Lead / Senior .NET Software Engineer');
  });
});