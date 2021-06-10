import Image from "next/image";

const InstagramGallery = ({ photos }) => {
  return (
    <div className="flex flex-wrap justify-between mx-24">
      {photos.map(({ node }, i) => {
        if (!node.is_video) {
          return (
            <div key={node.id} className="w-full md:w-1/4 px-1">
              <Image
                width={node.thumbnail_resources[3].config_width}
                height={node.thumbnail_resources[3].config_height}
                src={node.thumbnail_src}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default InstagramGallery;
