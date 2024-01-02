"use client";

import ImageLabeler from "@/components/ImageLabeler";
import { originUrl } from "@/config/url";
import { useRouter, useSearchParams } from "next/navigation";

const Tool = () => {
  const searchParams = useSearchParams();

  const imageUrl = searchParams.get("image_url");

  return (
    <div>
      <div>
        <ImageLabeler imageUrl={originUrl + "/" + imageUrl} />
      </div>
    </div>
  );
};

export default Tool;
