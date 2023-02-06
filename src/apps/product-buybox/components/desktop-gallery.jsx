import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";
import { resizeImage } from "scripts/utils/Images.js";

import Badge from "../components/badge.jsx";

const DesktopGallery = () => {
  const { product } = window.eHS;
  const media = product.media;
  const videos = product.videos;

  const [selectedVariant, setSelectedVariant] = useState(
    window.state.selectedVariant || false
  );
  const [variantMedia, setVariantMedia] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setVariantMedia(constructMediaGallery(media, videos));
  }, [selectedVariant]);

  useEffect(addEffect("selectedVariant", setSelectedVariant), []);
  useEffect(() => refreshFsLightbox());

  const constructMediaGallery = (gallery, videos) => {
    let updatedGallery = gallery;

    if (
      product.variants.length == 1 &&
      product.variants[0].title == "Default Title"
    )
      return videos.length ? updatedGallery.concat(videos) : updatedGallery;
    if (!selectedVariant) return variantMedia;

    if (product.type !== "Gift Card") {
      updatedGallery = gallery.filter(
        (img) =>
          img.associated_variant == selectedVariant.options[0].toLowerCase() ||
          img.associated_variant == "lifestyle"
      );
    }

    return videos.length ? updatedGallery.concat(videos) : updatedGallery;
  };

  const scroll = (mediaIndex) => {
    setSelectedImageIndex(mediaIndex);
    const toScrollTo = document.querySelector(`#image-${mediaIndex}--desktop`);
    window.scrollTo({ top: toScrollTo.offsetTop });
  };

  return (
    <>
      <div className="hidden lg:flex flex-row gap-6">
        <div>
          <div className="flex flex-col gap-2 sticky top-[12rem]">
            {variantMedia.map((media, mediaIndex) =>
              media.type == "image" ? (
                <div
                  className={`cursor-pointer block w-[78px] h-[78px] border border-grey-100 ${
                    selectedImageIndex == mediaIndex &&
                    "!border-black !border-[2px]"
                  }`}
                  aria-label="Image Thumbnail"
                  key={`media-image-${mediaIndex}`}
                  onClick={() => scroll(mediaIndex)}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={resizeImage(media.variant_image, "small")}
                    alt={media.image_alt_text}
                  />
                </div>
              ) : (
                <div
                  className={`cursor-pointer relative block w-[78px] h-[78px] border border-grey-100 ${
                    selectedImageIndex == mediaIndex &&
                    "!border-black !border-[2px]"
                  }`}
                  aria-label="Image Thumbnail"
                  key={`media-image-${mediaIndex}`}
                  onClick={() => scroll(mediaIndex)}
                >
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 71 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <rect
                          fill="#111111"
                          width="71"
                          height="48"
                          rx="12"
                        ></rect>
                        <path
                          d="m31.555 15.63 12.188 6.707a2 2 0 0 1 .059 3.47l-12.188 7.257a2 2 0 0 1-3.023-1.718V17.383a2 2 0 0 1 2.964-1.752Z"
                          fill="#FFF"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <img
                    className="w-[78px] h-[78px] border-grey-100 object-center object-cover lazyloaded"
                    src={resizeImage(media.preview_image, "small")}
                    alt=""
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <Badge absolute="true" />
          {variantMedia.map((media, mediaIndex) =>
            media.type == "image" ? (
              <a
                id={`image-${mediaIndex}--desktop`}
                className="block mx-auto cursor-zoom-in w-full"
                data-fslightbox
                href={media.variant_image}
                key={`media-image-${mediaIndex}`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={resizeImage(media.variant_image, "x800")}
                  alt={media.image_alt_text}
                />
              </a>
            ) : (
              <div
                id={`image-${mediaIndex}--desktop`}
                className="flex justify-center items-center mx-auto relative aspect-video w-full"
                key={`media-image-${mediaIndex}`}
              >
                <iframe
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen="allowfullscreen"
                  imagesize="1400x"
                  className="w-full h-[400px]"
                  src={`https://www.youtube.com/embed/${media.external_id}?controls=1&amp;enablejsapi=1&amp;modestbranding=1&amp;playsinline=1&amp;rel=0`}
                  title={product.title}
                ></iframe>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default DesktopGallery;
