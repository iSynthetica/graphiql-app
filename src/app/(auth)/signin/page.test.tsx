import React from 'react';
import { describe, it, vi } from 'vitest';

import Login from './page';
import { AuthContext } from '../../../../mocks/AuthContext';

vi.mock('next/router', () => vi.importActual('next-router-mock'));
describe('Sign In', () => {
  it('should render Sign in', () => {
    <AuthContext.Provider value={{ user: null }}>
      <Login />
    </AuthContext.Provider>;
  });
});
