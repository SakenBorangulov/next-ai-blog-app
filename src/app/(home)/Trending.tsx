import Link from "next/link";
import React from "react";
import { Post } from "../../../generated/prisma";
import Image from "next/image";

type TrendingCardProps = {
  className?: string;
  post: Post;
};

function TrendingCard({ className, post }: TrendingCardProps) {
  return (
    <Link
      className={`${className} sm:mt-0 sm:h-auto relative mt-7 block w-full h-96 hover:opacity-70`}
      href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
    >
      <div className="z-0 relative w-full h-full">
        <Image
          fill
          sizes="(max-width: 480px) 100vw,
                   (max-width: 768px) 75vw,
                   (max-width: 1060px) 50vw,
                   33vw"
          placeholder="blur"
          blurDataURL={post?.blurImage}
          style={{ objectFit: "cover" }}
          alt="tech"
          src={post?.image}
        />
      </div>
      <div className="absolute z-1 top-0 left-0 w-full h-full gradient-gradual" />
      <div className="absolute z-2 bottom-0 left-0 p-3">
        <h4 className="inline-block px-5 py-1 font-semibold bg-accent-orange text-wh-900">
          {post?.category}
        </h4>
        <div className="text-wh-100 mt-2">{post?.title}</div>
      </div>
    </Link>
  );
}

type Props = {
  trendingPosts: Post[];
};

export default function Trending({ trendingPosts }: Props) {
  return (
    <section className="pt-3 pb-10">
      <div className="flex items-center gap-3">
        <div className="bg-wh-900 py-2 px-8 text-wh-10 text-sm font-bold">
          TRENDING
        </div>
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
          exercitationem temporibus culpa aperiam.
        </p>
      </div>

      {/* FLEX OPTION */}
      {/* <div className="flex justify-between gap-3 my-3">
        <div className="basis-1/2 bg-wh-500 h-96"></div>
        <div className="flex flex-col basis-1/2 gap-3 h-96">
          <div className="basis-1/2 bg-wh-500"></div>
          <div className="flex basis-1/2 gap-3">
            <div className="basis-1/2 bg-wh-500"></div>
            <div className="basis-1/2 bg-wh-500"></div>
          </div>
        </div>
      </div> */}

      {/* GRID OPTION */}
      <div className="sm:grid gap-5 grid-cols-4 grid-rows-2 sm:h-[600px] my-3">
        <TrendingCard
          className="col-span-2 row-span-2 bg-wh-500"
          post={trendingPosts[0]}
        />
        <TrendingCard
          className="col-span-2 row-span-1 bg-wh-500"
          post={trendingPosts[1]}
        />
        <TrendingCard
          className="col-span-1 row-span-1 bg-wh-500"
          post={trendingPosts[2]}
        />
        <TrendingCard
          className="col-span-1 row-span-1 bg-wh-500"
          post={trendingPosts[3]}
        />
      </div>

      <p className="text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique cum
        asperiores, porro reprehenderit id omnis animi. Doloribus consequuntur
        fuga sunt perferendis in, minus.
      </p>
    </section>
  );
}
