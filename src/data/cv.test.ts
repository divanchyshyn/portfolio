import { describe, expect, it } from 'vitest';
import {
  education,
  experience,
  formatMonth,
  formatPeriod,
  profile,
  projects,
  skills,
  spokenLanguages,
  yearsOfExperience,
} from './cv';

const ISO_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

describe('profile', () => {
  it('fills every field the sections render', () => {
    for (const [key, value] of Object.entries(profile)) {
      expect(value, `profile.${key} must be set`).toBeTruthy();
    }
  });

  it('uses canonical profile links', () => {
    expect(profile.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/$/);
    expect(profile.github).toMatch(/^https:\/\/github\.com\/[\w-]+$/);
  });

  it('starts the career where the employment history starts', () => {
    const oldest = experience.reduce((first, job) => (job.start < first.start ? job : first));
    expect(profile.careerStart).toBe(oldest.start);
  });
});

describe('experience', () => {
  it('is ordered from the most recent role backwards', () => {
    for (let i = 1; i < experience.length; i++) {
      expect(experience[i - 1].start >= experience[i].start).toBe(true);
    }
  });

  it('every entry is complete and internally consistent', () => {
    for (const job of experience) {
      expect(job.company, `${job.company}: company`).toBeTruthy();
      expect(job.role, `${job.company}: role`).toBeTruthy();
      expect(job.summary, `${job.company}: summary`).toBeTruthy();
      expect(job.start, `${job.company}: start`).toMatch(ISO_MONTH);
      if (job.end) {
        expect(job.end).toMatch(ISO_MONTH);
        expect(job.end > job.start, `${job.company}: end after start`).toBe(true);
      }
      expect(job.highlights.length, `${job.company}: highlights`).toBeGreaterThan(0);
      expect(job.tech.length, `${job.company}: tech`).toBeGreaterThan(0);
      expect(new Set(job.tech).size, `${job.company}: tech uniqueness`).toBe(job.tech.length);
      for (const highlight of job.highlights) {
        expect(highlight, `${job.company}: highlight`).toBeTruthy();
      }
    }
  });

  it('covers the whole employment history from the CV', () => {
    expect(experience.map((job) => job.company)).toEqual([
      'Eneco',
      'Ayvens',
      'CarNext',
      'Virtual Affairs',
      'Unic',
      'DGS BS Sp. z o.o.',
      'Rothausen Development',
    ]);
  });
});

describe('formatMonth', () => {
  it('formats ISO months as short labels', () => {
    expect(formatMonth('2024-08')).toBe('Aug 2024');
    expect(formatMonth('2013-11')).toBe('Nov 2013');
  });

  it('rejects malformed input', () => {
    expect(() => formatMonth('2024-13')).toThrow();
    expect(() => formatMonth('not-a-date')).toThrow();
  });
});

describe('formatPeriod', () => {
  it('marks current roles as present', () => {
    expect(formatPeriod('2024-08')).toBe('Aug 2024 – present');
  });

  it('formats closed roles', () => {
    expect(formatPeriod('2023-01', '2024-07')).toBe('Jan 2023 – Jul 2024');
  });
});

describe('yearsOfExperience', () => {
  it('counts full years since the first role, rounding to the CV number', () => {
    // Nov 2013 to Sep 2026 is 12 years and 10 months — reported as 13.
    expect(yearsOfExperience(new Date(2026, 8, 25))).toBe(13);
    // Nov 2013 to Oct 2014 is not a full year yet.
    expect(yearsOfExperience(new Date(2014, 9, 15))).toBe(1);
  });
});

describe('skills', () => {
  it('groups are named and hold unique non-empty items', () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const group of skills) {
      expect(group.title).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
      expect(new Set(group.items).size).toBe(group.items.length);
      for (const item of group.items) {
        expect(item).toBeTruthy();
      }
    }
  });
});

describe('projects', () => {
  it('has valid unique links', () => {
    const names = projects.map((project) => project.name);
    expect(new Set(names).size).toBe(names.length);
    for (const project of projects) {
      expect(() => new URL(project.url)).not.toThrow();
      const sourceUrl = project.sourceUrl;
      if (sourceUrl) {
        expect(() => new URL(sourceUrl)).not.toThrow();
      }
    }
  });
});

describe('languages and education', () => {
  it('lists the five spoken languages from the CV', () => {
    expect(spokenLanguages.map((language) => `${language.name} ${language.level}`)).toEqual([
      'Ukrainian Native',
      'English C1',
      'Russian C2',
      'Polish C1',
      'Dutch B2',
    ]);
  });

  it('has at least one education entry with all fields', () => {
    expect(education.length).toBeGreaterThan(0);
    for (const entry of education) {
      expect(entry.period).toBeTruthy();
      expect(entry.school).toBeTruthy();
      expect(entry.degree).toBeTruthy();
    }
  });
});