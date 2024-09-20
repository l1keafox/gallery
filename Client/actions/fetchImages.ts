"use server";


export async function getStoriesByPage(
  starts_with: string,
  page: number,
  per_page: number,
) {
  const fullQueryParams = {
    starts_with,
    per_page,
    page,
  };

  return await fetchStoryblokStories(fullQueryParams);
}

/**
 * fetches multiple assets at once from the Storyblok API, filterTags then by filename for ["png","webp","svg","jpg","jpeg"];
 * @param page current page
 * @param perPage number of entries per page
 * @returns an array of assets
 */

export async function getImagesByPage(page: number, perPage: number) {
  const queryParams = {
    page,
    per_page: perPage,
  };
  const story = await fetchStoryblokAssets(queryParams);
  return filterAssetsForImages(story.assets);
}
