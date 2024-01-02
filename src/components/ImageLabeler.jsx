"use client";

import React, { useRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SlMenu } from "react-icons/sl";
import { FaHandPointer } from "react-icons/fa";
import { PiBoundingBoxThin } from "react-icons/pi";

const ImageLabeler = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [bboxList, setBboxList] = useState([]);
  const [tool, setTool] = useState(0);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;

      // 이미지를 캔버스에 그립니다.
      ctx.drawImage(image, 0, 0);
      imageRef.current = image;
    };
  }, [imageUrl]);

  useEffect(() => {
    // bbox가 존재할 때만
    if (bboxList[0]) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // 캔버스의 전체 크기를 지정하여 전체를 지웁니다
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 이미지를 캔버스에 그립니다.
      const image = new Image();
      image.src = imageUrl;
      ctx.drawImage(image, 0, 0);
      imageRef.current = image;

      for (let i = 0; i < bboxList.length; i++) {
        ctx.beginPath(); // 새로운 경로 시작

        if (bboxList[i].active === true) {
          ctx.rect(
            bboxList[i].x0,
            bboxList[i].y0,
            bboxList[i].width,
            bboxList[i].height
          ); // 새로운 사각형
          ctx.fillStyle = "red"; // 채울 색상 설정
          ctx.fill(); // 사각형 채우기
        } else {
          ctx.rect(
            bboxList[i].x0,
            bboxList[i].y0,
            bboxList[i].width,
            bboxList[i].height
          ); // 새로운 사각형
        }

        ctx.closePath(); // 경로 종료

        ctx.stroke();
      }
    }
  }, [bboxList]);

  const handleMouseDown = (e) => {
    if (tool == 0) {
    }

    if (tool != 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setStartPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDrawing(true);
  };

  const _drawCrosshair = (ctx, x, y) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // 캔버스 클리어
    // ctx.clearRect(0, 0, width, height);

    // 이미지를 캔버스에 그립니다.
    // const image = new Image();
    // image.src = imageUrl;
    // ctx.drawImage(image, 0, 0);
    // imageRef.current = image;

    // 세로선 그리기
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.strokeStyle = "#FF0000"; // 빨간색 선
    ctx.stroke();

    // 가로선 그리기
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  };

  const handleMouseMove = (e) => {
    if (tool == 0) {
      const ctx = canvasRef.current.getContext("2d");

      // 캔버스의 상대적인 위치를 얻음
      const rect = canvasRef.current.getBoundingClientRect();

      // 캔버스 내의 마우스 위치를 계산
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // console.log(clientX, clientY);

      for (let i = 0; i < bboxList.length; i++) {
        let x0 =
          bboxList[i].width < 0
            ? bboxList[i].x0 + bboxList[i].width
            : bboxList[i].x0;
        let y0 =
          bboxList[i].height < 0
            ? bboxList[i].y0 + bboxList[i].height
            : bboxList[i].y0;
        let x1 = x0 + Math.abs(bboxList[i].width);
        let y1 = y0 + Math.abs(bboxList[i].height);

        // 클릭된 위치가 사각형 내부인지 확인
        if (x0 < clientX && x1 > clientX && y0 < clientY && y1 > clientY) {
          // console.log("사각형 인식");
          setCursor(true);
          return;
        }
      }
      setCursor(false);
    }

    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.rect(
      startPoint.x,
      startPoint.y,
      currentX - startPoint.x,
      currentY - startPoint.y
    );
    ctx.stroke();
  };

  const handleMouseUp = (e) => {
    if (tool != 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const width = currentX - startPoint.x;
    const height = currentY - startPoint.y;

    setIsDrawing(false);
    // 여기서 바운딩 박스 데이터를 저장하거나 처리할 수 있습니다.

    if (Math.abs(width) < 5 || Math.abs(height) < 5) {
      // 너무 작으면 종료
      setBboxList([...bboxList]);
      return;
    }

    const bbox = {
      class: 0,
      label: "bread",
      x0: startPoint.x,
      y0: startPoint.y,
      width: width,
      height: height,
      active: false,
    };
    // console.log(bbox);
    setBboxList([...bboxList, bbox]);
  };

  // 클릭 이벤트 리스너
  const handleClick = (event) => {
    const { clientX, clientY } = event;
    const { left, top } = canvas.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    // 클릭된 위치가 사각형 내부인지 확인
    if (
      x > rect.x &&
      x < rect.x + rect.width &&
      y > rect.y &&
      y < rect.y + rect.height
    ) {
      alert("사각형 클릭!");
    }
  };

  // const handleMouseLeave = () => {
  //   // 화면 밖으로 나가면 박스 그리기 종료
  //   setIsDrawing(false);
  // };

  return (
    <>
      <div className="flex">
        <menu className="overflow-y-scroll max-h-[700px]">
          {bboxList[0] ? (
            <div className="bg-neutral flex justify-center p-5">
              <button className="btn btn-primary w-full">저장</button>
            </div>
          ) : null}
          <ul className="menu bg-neutral w-56 h-full">
            {bboxList.map((bbox, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    if (bbox.active) {
                      let copy = [...bboxList];
                      copy[i].active = false;
                      setBboxList(copy);
                      console.log(copy);
                    } else {
                      let copy = [...bboxList];
                      for (let j = 0; j < copy.length; j++) {
                        copy[j].active = false;
                      }
                      copy[i].active = true;
                      setBboxList(copy);
                      console.log(copy);
                    }
                  }}
                >
                  <a
                    className={
                      bbox.active &&
                      "bg-accent hover:bg-accent text-white hover:bg-opacity-70"
                    }
                  >
                    {bbox.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </menu>
        <div className="w-fit h-fit">
          <header>
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <a className="btn btn-ghost text-xl">NES-Labeling</a>
              </div>
              <div className="flex-none">
                <button
                  className={twMerge(
                    "btn btn-square btn-ghost",
                    tool == 0 && "hover:bg-primary bg-primary"
                  )}
                  onClick={() => {
                    setTool(0);
                  }}
                >
                  <FaHandPointer />
                </button>
                <button
                  className={twMerge(
                    "btn btn-square btn-ghost",
                    tool == 1 && "hover:bg-primary bg-primary"
                  )}
                  onClick={() => {
                    setTool(1);
                  }}
                >
                  <PiBoundingBoxThin />
                </button>
                <button
                  className={twMerge(
                    "btn btn-square btn-ghost",
                    tool == 2 && "hover:bg-primary bg-primary"
                  )}
                  onClick={() => {
                    setTool(2);
                  }}
                >
                  <SlMenu />
                </button>
              </div>
            </div>
          </header>
          <canvas
            className={twMerge("cursor-default", cursor && "cursor-pointer")}
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </>
  );
};

export default ImageLabeler;
