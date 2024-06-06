import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  people: defineTable({
    fullname: v.string(),
    birthday: v.string(),
    image: v.optional(v.id('_storage')),
  }),
});
