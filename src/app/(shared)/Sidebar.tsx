import React from "react";
import SocialLinks from "./SocialLinks";
import Subscribe from "./Subscribe";
import Image from "next/image";
import Ad2 from "../../../public/assets/ad-2.png";
import AboutProfile from "../../../public/assets/about-profile.jpg";

export default function Sidebar() {
  return (
    <section>
      <h4 className="bg-wh-900 py-3 px-5 text-wh-50 text-xs font-bold text-center">
        Subscribe and Follow
      </h4>
      <div className="my-5 mx-5">
        <SocialLinks isDark />
      </div>
      <Subscribe />
      <div className="bg-wh-900 my-8">
        <Image
          className="hidden md:block my-8 w-full"
          placeholder="blur"
          alt="advert-2"
          src={Ad2}
          width={500}
          height={1000}
        />
      </div>
      <h4 className="bg-wh-900 py-3 px-5 text-wh-50 text-xs font-bold text-center">
        About the Blog
      </h4>
      <div className="flex justify-center my-3">
        <Image
          placeholder="blur"
          alt="about-profile"
          src={AboutProfile}
          style={{objectFit: "cover", width: "500px", height: "250px"}}
        />
      </div>
      <h4 className="py-3 px-5 text-wh-500 font-bold text-center">
        Geoffrey Epstein
      </h4>
      <p className="text-wh-500 text-center text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta modi eum
        minima libero.
      </p>
    </section>    
  );
}
