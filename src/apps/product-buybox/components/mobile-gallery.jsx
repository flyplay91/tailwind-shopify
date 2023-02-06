import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";
import { resizeImage } from "scripts/utils/Images.js";

const MobileGallery = () => {
  const { product } = window.eHS;
  const media = product.media;
  const videos = product.videos;

  const [selectedVariant, setSelectedVariant] = useState(
    window.state.selectedVariant || false
  );
  const [variantMedia, setVariantMedia] = useState([]);

  useEffect(() => {
    setVariantMedia(constructMediaGallery(media, videos));
  }, [selectedVariant]);

  useEffect(() => {
    scrollToView();
  }, [selectedVariant?.options[0]]);

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

  const scrollToView = () => {
    if (!selectedVariant) return;

    const firstImage = document.querySelector('[data-media="0"');
    firstImage &&
      firstImage.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
  };

  return (
    <div className="overflow-hidden">
      <div className="pb-2 flex gap-x-6 scrollbar snap-mandatory lg:hidden h-[298px]">
        {variantMedia.map((media, mediaIndex) =>
          media.type == "image" ? (
            <a
              data-media={mediaIndex}
              className="block mx-auto shrink-0"
              data-fslightbox
              href={media.variant_image}
              key={`media-image-${mediaIndex}`}
            >
              <img
                className={[
                  "h-full snap-center object-contain",
                  product.type !== "Gift Card" ? "w-[90vw]" : "",
                ].join(" ")}
                src={resizeImage(media.variant_image, "x400")}
                alt={media.image_alt_text}
              />
            </a>
          ) : (
            <div
              data-media={mediaIndex}
              className="mx-auto shrink-0 w-[90vw] bg-black flex items-center justify-center"
              key={`media-video-${mediaIndex}`}
            >
              <iframe
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowfullscreen"
                imagesize="1400x"
                className="snap-center w-full h-full"
                src={`https://www.youtube.com/embed/${media.external_id}?controls=1&amp;enablejsapi=1&amp;modestbranding=1&amp;playsinline=1&amp;rel=0`}
                title={product.title}
              ></iframe>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MobileGallery;
