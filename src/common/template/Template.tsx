import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import ViewerTemplate from "./ViewerTemplate";
import LeftTab from "./LeftTab";
import Footer from "./Footer";

export default function Template(props: {
  problem: JSX.Element;
  controller: JSX.Element;
  viewer: JSX.Element;
  start: boolean;
  onStart: () => Promise<boolean> | boolean | void;
  onStop: () => void;
  onRefresh: () => void;
  onWidthChange?: (v: number) => void;
}) {
  const [dividerPosition, setDividerPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newDividerPosition = (e.clientX / window.innerWidth) * 100;
    const adjustedDividerPosition = Math.max(20, Math.min(newDividerPosition, 80));
    setDividerPosition(adjustedDividerPosition);
    if (props.onWidthChange) {
      props.onWidthChange(adjustedDividerPosition);
    }
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          width: 100%;
          height: calc(100% - 60px);
          position: relative;
        `}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <div
          css={css`
            width: calc(${dividerPosition}% - 5px);
            height: 100%;
          `}
        >
          <LeftTab
            tabs={[
              {
                label: "문제 설명",
                comp: props.problem,
              },
              {
                label: "예제 입력",
                comp: props.controller,
              },
            ]}
          />
        </div>
        <div
          css={css`
            position: absolute;
            top: 1px;
            bottom: 1px;
            width: 10px;
            left: calc(${dividerPosition}% - 5px);
            cursor: ew-resize;
            background-color: ${isDragging ? "#999" : "var(--background)"};
            &:hover {
              background-color: #999;
            }
          `}
          onMouseDown={startDragging}
        />
        <div
          css={css`
            width: calc(${100 - dividerPosition}% - 5px);
            height: 100%;
            margin-left: 10px;
          `}
        >
          <ViewerTemplate viewer={props.viewer} />
        </div>
      </div>
      <Footer
        start={props.start}
        onStart={props.onStart}
        onStop={props.onStop}
        onRefresh={props.onRefresh}
      />
    </>
  );
}
