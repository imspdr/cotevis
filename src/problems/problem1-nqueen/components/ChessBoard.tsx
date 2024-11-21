import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useProblemStore } from "../store/ProblemStoreProvider";
import { unselectable } from "@src/util";
import { ReactComponent as QueenIcon } from "@src/images/queenIcon.svg";

function ChessBlock(props: {
  color: number; // 0 for black 1 for white
  size: number;
  hasQueen: boolean;
  isCovered: boolean;
  onClick: () => void;
}) {
  return (
    <div
      css={css`
        width: ${Math.floor(100 / props.size)}%;
        height: 100%;
        background-color: ${props.color === 0
          ? props.isCovered
            ? "#009999"
            : "#000000"
          : props.isCovered
          ? "#22cccc"
          : "#ffffff"};
        color: #000000;
        transition: 0s;
        display: flex;
        align-items: center;
        justify-content: center;
        ${unselectable}
      `}
      onClick={props.onClick}
    >
      {props.hasQueen ? (
        <QueenIcon width={"80%"} height={"80%"} fill={props.color === 0 ? "#ffffff" : "#000000"} />
      ) : (
        ""
      )}
    </div>
  );
}

function ChessBoard() {
  const chessStore = useProblemStore();
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      {[...new Array(chessStore.nQueen)].map((_, i) => {
        return (
          <div
            key={`${i}th-row-of-chessboard`}
            css={css`
              display: flex;
              flex-direcion: row;
              height: calc(${Math.floor(100 / chessStore.nQueen)}%);
            `}
          >
            {[...new Array(chessStore.nQueen)].map((_, j) => {
              return (
                <ChessBlock
                  key={`${i}${j}th-chessblock`}
                  color={(i + j) % 2 === 0 ? 0 : 1}
                  size={chessStore.nQueen}
                  hasQueen={chessStore.included(i, j)}
                  isCovered={chessStore.isCovered(i, j)}
                  onClick={() => {
                    chessStore.addQueenOnPos(i, j);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default observer(ChessBoard);