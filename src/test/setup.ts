import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('framer-motion', () => import('./__mocks__/framer-motion'));
