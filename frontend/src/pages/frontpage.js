import * as React from "react";
import { Skeleton } from "baseui/skeleton";
import { useStyletron } from "baseui";

export default function Frontpage() {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40px",
        display: "flex",
      })}
    >
      <Skeleton
        rows={5}
        width="60%"
        animation
        overrides={{
          Row: {
            style: {
              height: "20px",
              marginBottom: "15px",
            },
          },
        }}
      />{" "}
    </div>
  );
}
