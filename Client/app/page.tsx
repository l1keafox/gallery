//import { getImagesByPage } from "@/actions/fetchStoryblok";
import { PhotoGallery } from "./_components/PhotoGallery";
import { UploadBtn } from "./_components/Upload";
export interface GalleryPageProps {}

export const GALLERY_PER_PAGE = 15;
export default async function GalleryPage({}: GalleryPageProps) {
  const [startingAssets] = await Promise.all([
    //getImagesByPage(1, GALLERY_PER_PAGE),
    // fetchStoryblokStory( GALLERY_PAGE_SLUG )
  ]);
  function doAct(){

  }
  return (
    <>
      {/* <PhotoGallery startingAssets={startingAssets} /> */}
      <UploadBtn />
    </>
  );
}
