import InstagramGallery from "./Gallery";
import Instagram from "instagram-web-api";

const client = new Instagram({
  username: process.env.IG_USERNAME,
  password: process.env.IG_PASSWORD,
});

export default async function InstagramFeed() {
  let posts = [];
  try {
    await client.login();
    // request photos for a specific instagram user
    const instagram = await client.getPhotosByUsername({
      username: process.env.IG_USERNAME,
    });

    if (instagram["user"]["edge_owner_to_timeline_media"]["count"] > 0) {
      posts = instagram["user"]["edge_owner_to_timeline_media"]["edges"];
    }
  } catch (err) {
    console.log(
      "Something went wrong while fetching content from Instagram",
      err
    );
  }

  const instagramPosts = posts;

  return (
    <>
      <h2>
        <a href="https://www.instagram.com/majabogren/">@Majabogren</a>
      </h2>

      <div className="my-16">
        <InstagramGallery photos={instagramPosts} />
      </div>
    </>
  );
}
