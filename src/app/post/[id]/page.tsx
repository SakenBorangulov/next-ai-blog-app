import Sidebar from "@/app/(shared)/Sidebar";
import { prisma } from "@/app/api/client";
import Content from "./Content";
import { Post as PostType } from "../../../../generated/prisma";
import { FormattedPost } from "@/app/types";

export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string
  }>
};

async function getPost(id: string) {
  const post: PostType | null = await prisma.post.findUnique({
    where: { id }
  })

  if(!post) {
    console.log(`Post with id ${id} not found`);
    return null;
  }

  const formattedPost = {
    ...post,
    createdAt: post?.createdAt?.toISOString(),
    updatedAt: post?.updatedAt?.toISOString(),
  }

  // const response = await fetch(url,{
  //   // cache: "force-cache", // SSG (getStaticSideProps)
  //   // cache: "no-store", // SSR (getServerSideProps)
  //   next: {revalidate: 60}
  // })

  return formattedPost;
}

export default async function Post({ params }: Props) {
  const { id } = await params;
  const post: FormattedPost | null = await getPost(id)
  console.log("post: ", post);

  if(!post) {
    return (
      <div>Post Not Found!</div>
    )
  }
  

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Content post={post}/>
        </div>
        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
