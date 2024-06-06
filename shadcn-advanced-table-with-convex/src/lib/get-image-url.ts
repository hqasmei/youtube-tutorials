export function getImageUrl(imageKey: string) {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL?.replace('.cloud', '.site')}/getImage?storageId=${imageKey}`;
}
