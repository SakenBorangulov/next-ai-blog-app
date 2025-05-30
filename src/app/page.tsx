// import Trending from "./(home)/trending/page"
import Trending from "./(home)/Trending";
import Tech from "./(home)/Tech";
import Travel from "./(home)/Travel";
import Other from "./(shared)/Other";
import Subscribe from "./(shared)/Subscribe";
import Sidebar from "./(shared)/Sidebar";
import { prisma } from "./api/client";
import { Post } from "../../generated/prisma";
import getBase64 from "./lib/getLocalBase64";

export const revalidate = 60;

export async function getPosts() {
  const posts = await prisma.post.findMany();

  const formattedPosts = await Promise.all(
    posts.map(async (post: Post) => {
      const myBlurDataUrl =   await getBase64(`http://localhost:3000/${post.image}`) as string

      return {
        ...post,
        blurImage: myBlurDataUrl
      }
    })
  )


  return formattedPosts;
}


export default async function Home() {
  const posts = await getPosts();

  function formatPosts() {
    const trendingPosts: Array<Post> = []
    const techPosts: Array<Post> = []
    const travelPosts: Array<Post> = []
    const otherPosts: Array<Post> = []

    posts.forEach((post: Post, i: number) => {
      if(i < 4) {
        trendingPosts.push(post)
      }
      if(post?.category === "Tech") {
        techPosts.push(post)
      } else if(post?.category === "Travel") {
        travelPosts.push(post)
      } else if(post?.category === "Interior Design") {
        otherPosts.push(post)
      }
    })

    return [trendingPosts, techPosts, travelPosts, otherPosts];
  }

  const [ trendingPosts, techPosts, travelPosts, otherPosts] = formatPosts()

  return (
    <main className="px-10 leading-7">
      <Trending trendingPosts={trendingPosts}/>
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Tech techPosts={techPosts}/>
          <Travel travelPosts={travelPosts}/>
          <Other otherPosts={otherPosts}/>
          <div className="hidden md:block">
            <Subscribe />
          </div>
        </div>
        <div className="basis-1/4"> 
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
