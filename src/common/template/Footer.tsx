import { css } from "@emotion/react";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";

export default function Footer(props: {
  onStart: () => Promise<boolean> | boolean | void;
  onStop: () => void;
  onRefresh: () => void;
  tab?: boolean;
  onChange?: () => void;
}) {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const onClick = async () => {
    if (start) {
      props.onStop();
      setStart(false);
    } else {
      setStart(true);
      const ret = await props.onStart();
      if (ret) setStart(false);
    }
  };
  return (
    <div
      css={css`
        position: absolute;
        bottom: 0px;
        padding: 5px;
        min-width: 290px;
        width: calc(100% - 10px);
        height: 50px;
      `}
    >
      <div
        css={css`
          width: calc(100% - 20px);
          padding: 0px 10px;
          height: 100%;
          border: 1px solid;
          border-radius: 10px;
          background-color: var(--paper);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 80px;
            display: flex;
            flex-direction: row;
          `}
        >
          <Button
            onClick={() => navigate("/")}
            color="inherit"
            css={css`
              width: 30px;
              .MuiTouchRipple-root {
                & .MuiTouchRipple-ripple {
                  width: 32px;
                  height: 32px;
                }
              }
            `}
          >
            <ReorderIcon
              css={css`
                width: 24px;
              `}
            />
          </Button>
          {props.onChange && (
            <Button
              css={css`
                width: 30px;
              `}
              onClick={props.onChange}
              color="inherit"
            >
              {!props.tab ? <SwitchLeftIcon /> : <SwitchRightIcon />}
            </Button>
          )}
        </div>
        <div
          css={css`
            width: 160px;
            display: flex;
            flex-direction: row;
          `}
        >
          <Button
            onClick={props.onRefresh}
            disabled={start}
            variant="contained"
            color="inherit"
            css={css`
              width: 72px;
            `}
          >
            {"초기화"}
          </Button>
          <Button
            onClick={onClick}
            variant="contained"
            color="inherit"
            css={css`
              margin-left: 10px;
              width: 72px;
              background-color: ${start ? "var(--warning)" : "var(--highlight)"};
            `}
          >
            {start ? "정지" : "시작"}
          </Button>
        </div>
      </div>
    </div>
  );
}
