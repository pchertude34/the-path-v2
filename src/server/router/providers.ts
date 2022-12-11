import { Prisma } from '@prisma/client';
import { createRouter } from './context';
import { z } from 'zod';

type Provider = {
  id: number;
  placeId: string;
  name: string;
  undisclosed: boolean;
  address: string;
  city: string;
  state: string;
  website?: string;
  email?: string;
  description?: string;
};

export const providerRouter = createRouter().query('list', {
  input: z.object({
    lat: z.number(),
    lng: z.number(),
    distance: z.number(),
    serviceType: z.string(),
  }),
  async resolve({ input, ctx }) {
    const userLocation = `ST_MakePoint(${input.lat}, ${input.lng})`;
    const query = Prisma.sql`
      SELECT p.id AS id, p.placeId AS placeId, p.name AS name, p.undisclosed AS undisclosed, p.address AS address, p.city AS city, p.state AS state, p.website AS website, p.email AS email, p.description AS description, ST_DistanceSphere(p.location, ${Prisma.raw(
        userLocation
      )}) AS distance FROM provider p
      LEFT JOIN service_on_provider sop ON sop.provider_id = p.id
      LEFT JOIN service s ON s.id = sop.service_id
      WHERE ST_DistanceSphere(p.location, ${Prisma.raw(userLocation)}) < ${input.distance}
      AND s.id = ${input.serviceType}
      ORDER BY distance ASC;
    `;

    const providers: Provider[] = await ctx.prisma.$queryRaw(query);

    return providers;
  },
});
