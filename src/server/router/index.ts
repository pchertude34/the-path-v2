// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { protectedExampleRouter } from './protected-example-router';
import { serviceTypesRouter } from './serviceTypes';
import { providerRouter } from './providers';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', protectedExampleRouter)
  .merge('servivceTypes.', serviceTypesRouter)
  .merge('providers.', providerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
