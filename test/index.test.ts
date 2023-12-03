/*
 * index.test.ts
 * 
 * Created by Dr. Maximillian Dornseif 2023-12-03 in fastify-for-appengine 1.0.0
 * Copyright (c) 2023 HUDORA GmbH
 */

import {describe, it, expect} from 'vitest';
import { fastifyConfig } from '../src/index';

describe('fastifyConfig', () => {
  it('exists', () => {
    expect(fastifyConfig).toBeDefined();
  });
});
