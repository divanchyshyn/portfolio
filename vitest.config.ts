// Vitest runs on the Astro toolchain so component tests can render .astro
// components through the Container API (see src/components/*.test.ts).
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});