"use client";

import UnlabeledCard from "@/components/UnlabeledCard";
import { originUrl } from "@/config/url";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Tool = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [datas, setDatas] = useState([]);
  const maxPageData = 24; // 한 페이지 당 보여줄 데이터 개수
  const router = useRouter();

  useEffect(() => {
    axios.get(originUrl + "/image/unlabeled").then((res) => {
      setDatas(
        res.data.slice((activePage - 1) * maxPageData, activePage * maxPageData)
      );
      setTotalPage(Math.ceil(res.data.length / maxPageData));
      console.log(Math.ceil(res.data.length / maxPageData));
    });
  }, [activePage]);

  return (
    <div>
      <article className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 min-w-[600px] m-auto">
        {datas.map((data, i) => {
          return (
            <div
              key={data._id}
              className="hover:scale-110 transition"
              onClick={() => {
                router.push("/tool/labeling?image_url=" + data.file_url);
              }}
            >
              <UnlabeledCard
                id={data._id}
                image_url={originUrl + "/" + data.file_url}
                image_name={data.file_name}
              />
            </div>
          );
        })}
      </article>
      <div className="h-[40px]" />
      <div className="join flex justify-center">
        <button
          className="join-item btn"
          onClick={() => {
            if (activePage <= 1) {
              // 첫 페이지입니다.
              console.log("첫 페이지 입니다.");
              return;
            }
            setActivePage(activePage - 1);
          }}
        >
          «
        </button>
        <button className="join-item btn">Page {activePage}</button>
        <button
          className="join-item btn"
          onClick={() => {
            if (activePage >= totalPage) {
              // 마지막 페이지입니다.
              console.log("마지막 페이지 입니다.");

              return;
            }
            setActivePage(activePage + 1);
          }}
        >
          »
        </button>
      </div>
      <div className="h-[100px]" />
    </div>
  );
};

export default Tool;
