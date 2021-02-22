import React from "react";
import PropTypes from "prop-types";
import { down, msConvert } from "../utils";

const Span = (props) => {
  const { refSpan, finished, text, data, className, time } = props;

  const downStyle = {
    transform: `translate3d(0, ${refSpan?.current}px, 0)`,
    transition: `${msConvert(time)}s ease-in-out`,
  };

  const upStyle = {
    transform: `translate3d(0, -${refSpan?.current}px, 0)`,
    transition: `${msConvert(time)}s ease-in-out`,
  };

  return (
    <span
      onTransitionEnd={finished}
      ref={(e) =>
        refSpan?.current === null && (refSpan.current = e?.clientHeight)
      }
      className={className}
      style={
        data.currentCount !== data.prevCount
          ? down(data)
            ? downStyle
            : upStyle
          : {}
      }
    >
      {text}
    </span>
  );
};

Span.propTypes = {
  refSpan: PropTypes.object,
  finished: PropTypes.func,
  text: PropTypes.number,
  data: PropTypes.object,
  className: PropTypes.object,
};

Span.defaultProps = {
  finished: () => {},
  refSpan: {},
};

export { Span };
