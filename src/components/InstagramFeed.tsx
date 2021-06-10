import InstagramGallery from "./Gallery";

export default function InstagramFeed({ instagramPosts }) {
  return (
    <>
      <h2>
        <a href="https://www.instagram.com/majabogren/">
          @Majabogren
        </a>
      </h2>

      <div className="my-16">
        {/* let's iterate through each of the
         instagram posts that were returned
         from the Instagram API*/}
         <InstagramGallery photos={instagramPosts}/>
      </div>
    </>
  );
}
