"use client";

import { originUrl } from "@/config/url";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const Tool = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="p-6">
      <div className="card lg:card-side bg-base-300 shadow-xl m-auto w-[700px] p-4">
        <figure className="">
          <Image src="/movie_icon.jpg" alt="picture" width={300} height={300} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">동영상을 업로드 해 주세요!</h2>
          <p>업로드 후에 업로드 버튼을 누르면 이미지로 변환을 해 줍니다.</p>

          <div className="card-actions justify-end mt-12">
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
            />
            <button
              className="btn btn-active btn-primary"
              onClick={async () => {
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file); // 'file'이라는 키로 파일 추가
                  axios
                    .post(originUrl + "/file/upload/extract", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((res) => {
                      toast.success("성공!");
                      console.log(res.data);
                    })
                    .catch((err) => {
                      toast.error("전송 중 에러 발생");
                    });
                }
              }}
            >
              업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tool;
