import { Prisma } from '@prisma/client';
import { createRouter } from './context';
import { z } from 'zod';

type ServiceType = {
  id: string;
  description: string;
  total: bigint;
};

export const serviceTypesRouter = createRouter().query('list', {
  input: z.object({
    lat: z.number(),
    lng: z.number(),
    distance: z.number(),
  }),
  async resolve({ input, ctx }) {
    try {
      const userLocation = `ST_MakePoint(${input.lat}, ${input.lng})`;
      const query = Prisma.sql`
        SELECT s.id, s.description, COUNT(sop.service_id) AS total FROM service_on_provider sop
        INNER JOIN provider p ON p.id = sop.provider_id AND ST_DistanceSphere(p.location, ${Prisma.raw(
          userLocation
        )}) < ${input.distance}
        INNER JOIN service s ON s.id = sop.service_id
        GROUP BY s.id
        HAVING COUNT(sop.service_id) > 0
        ORDER BY s.description ASC;`;

      const nearbyServiceTypes: ServiceType[] = await ctx.prisma.$queryRaw(query);

      return nearbyServiceTypes;
    } catch (error) {
      console.log('error', error);
    }
  },
});
