import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { projects, skills } from '../data/cv';
import Skills from './Skills.astro';
import Projects from './Projects.astro';

// The renderer escapes ampersands; compare against escaped text.
const escapeAmpersands = (text: string): string => text.replace(/&/g, '&amp;');

describe('Skills section', () => {
  it('renders every skill group and item', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Skills);

    for (const group of skills) {
      expect(html).toContain(escapeAmpersands(group.title));
      for (const item of group.items) {
        expect(html).toContain(escapeAmpersands(item));
      }
    }
  });
});

describe('Projects section', () => {
  it('renders every project with its links', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Projects);

    for (const project of projects) {
      expect(html).toContain(project.name);
      expect(html).toContain(`href="${project.url}"`);
      if (project.sourceUrl) {
        expect(html).toContain(`href="${project.sourceUrl}"`);
      }
    }
  });
});