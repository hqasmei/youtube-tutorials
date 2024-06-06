import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { vid } from './util';

export const createPerson = mutation({
  args: {
    fullname: v.string(),
    birthday: v.string(),
    image: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('people', {
      fullname: args.fullname,
      birthday: args.birthday,
      image: args.image,
    });
  },
});

export const updatePerson = mutation({
  args: {
    personId: vid('people'),
    fullname: v.optional(v.string()),
    birthday: v.optional(v.string()),

    image: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    let toUpdate = {} as any;

    if (args.fullname) toUpdate.fullname = args.fullname;
    if (args.birthday) toUpdate.birthday = args.birthday;

    if (args.image) toUpdate.image = args.image;

    await ctx.db.patch(args.personId, toUpdate);
  },
});

export const deletePerson = mutation({
  args: { personId: vid('people') },
  handler: async (ctx, args) => {
    const person = await ctx.db.get(args.personId);
    if (!person) {
      throw new Error('work item not found');
    }

    return await ctx.db.delete(person._id);
  },
});

export const deletePeople = mutation({
  args: { peopleIds: v.array(vid('people')) },
  handler: async (ctx, args) => {
    await Promise.all(
      args.peopleIds.map(async (personId) => {
        const resource = await ctx.db.get(personId);
        if (!resource) {
          throw new Error(`Person not found: ${personId}`);
        }

        return await ctx.db.delete(resource._id);
      }),
    );
  },
});

export const getPerson = query({
  args: { personId: vid('people') },
  handler: async (ctx, args) => {
    const person = await ctx.db.get(args.personId);
    if (!person) {
      throw new Error('Person not found');
    }

    return person;
  },
});

export const getPeople = query({
  args: {},
  handler: async (ctx) => {
    const people = await ctx.db.query('people').collect();
    return people;
  },
});
