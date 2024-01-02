"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(ai_label1.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="w-full">
            <h1 className="mb-5 text-5xl font-bold">AI Labeling Tool</h1>
            <p className="mb-5">
              AI학습을 위한 라벨링을 도와주는 툴 입니다. 자동으로 영상에서
              프레임을 추출하여, 툴을 이용해 라벨링 해 주세요. 그리고 전처리와
              모델 학습까지 자동으로 해 줍니다.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push("/tool");
              }}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
