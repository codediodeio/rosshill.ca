import { slugify } from "$lib/functions";
import { data as timeline } from "$lib/posts.json";
import brandColors from "$lib/brandColors.json";

const contents = Object.values(timeline)
  .filter(post => !post.WIP)
  .map(post => {
    return {
      title: post.title,
      eventType: post.eventType,
      hasContent: !!post.contents,
      slug: slugify(post.title),
      date: post.date,
      endDate: post.endDate,
      seasonal: post.seasonal,
      ongoing: post.ongoing,
      blurb: post.blurb,
      repository: post.repository,
      website: post.website,
      thumbnailExt: post.thumbnailExt,
      tags: post.tags,
      thumbnail: post.thumbnail
        ? `timeline/${post.thumbnail}`
        : null
    };
  })
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

export function get() {
  return { body: { posts: contents, brandColors } };
}