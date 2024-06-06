import { httpRouter } from 'convex/server';

import { Id } from './_generated/dataModel';
import { httpAction } from './_generated/server';

const http = httpRouter();

http.route({
  path: '/getImage',
  method: 'GET',
  handler: httpAction(async (ctx, request) => {
    const { searchParams } = new URL(request.url);
    const storageId = searchParams.get('storageId') as Id<'_storage'> | null;

    if (!storageId) {
      return new Response('Missing storageId', {
        status: 400,
      });
    }

    const blob = await ctx.storage.get(storageId);
    if (blob === null) {
      return new Response('Image not found', {
        status: 404,
      });
    }
    return new Response(blob, {
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        Vary: 'origin',
      }),
    });
  }),
});

export default http;