import Link from "next/link";
import React from "react";
import { Post } from "../../../generated/prisma";
import Image from "next/image";
import getBase64 from "../lib/getLocalBase64";

type Props = {
  className?: string;
  imageHeight: string;
  isSmallCard?: boolean;
  isLongForm?: boolean;
  post: Post;
};

export default async function Card({
  className,
  imageHeight,
  isSmallCard = false,
  isLongForm = false,
  post,
}: Props) {
  const { title, author, createdAt, image, snippet } = post || {};
  const myBlurDataUrl =   await getBase64(`http://localhost:3000/${image}`) as string

  const date = new Date(createdAt);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className={className}>
      <Link
        className="basis-full hover:opacity-70"
        href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
      >
        <div className={`relative w-auto mb-3 ${imageHeight}`}>
          <Image
            fill
            sizes="(max-width: 480px) 100vw,
                   (max-width: 768px) 75vw,
                   (max-width: 1060px) 50vw,
                   33vw"
            placeholder="blur"
            blurDataURL={myBlurDataUrl}
            style={{ objectFit: "cover" }}
            alt="tech"
            src={post?.image}
          />
        </div>
      </Link>
      <div className="basis-full">
        <Link href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}>
          <h4
            className={`font-bold hover:text-accent-green ${
              isSmallCard ? "text-base" : "text-lg"
            } ${isSmallCard ? "line-clamp-2" : ""}`}
          >
            {title}
          </h4>
        </Link>

        <div className={`${isSmallCard ? "my-2" : "flex my-3"} gap-3`}>
          <h5 className="font-semibold text-xs">{author}</h5>
          <h6 className="text-wh-300 text-xs">{formattedDate}</h6>
        </div>
        <p
          className={`text-wh-500 ${
            isLongForm ? "line-clamp-5" : "line-clamp-3"
          }`}
        >
          {snippet}
        </p>
      </div>
    </div>
  );
}
