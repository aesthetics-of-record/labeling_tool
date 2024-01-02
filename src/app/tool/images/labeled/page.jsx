"use client";

import { useEffect, useState } from "react";

const Tool = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [activePage, setPage] = useState(1);

  useEffect(() => {}, []);
  return (
    <div>
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => {
            if (activePage > 1) {
            }
          }}
        >
          «
        </button>
        <button className="join-item btn">Page {activePage}</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
};

export default Tool;
