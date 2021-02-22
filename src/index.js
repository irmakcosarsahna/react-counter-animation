import React, { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Span } from "./components";
import { up } from "./utils";

const CounterAnimate = memo((props) => {
    const { count, time, className, animation, finished, onlyOne } = props;

    const refSpan = useRef(null);

    const [data, setData] = useState({
        currentCount: count,
        prevCount: count,
        wait: false,
    });

    const _finishedEvent = (e) => {
        // finished(data.currentCount)
        setData((current) => ({
            ...current,
            prevCount: current.currentCount,
            wait: false,
        }));
    };

    const _changeEvent = () => {
        setData((current) => ({
            ...current,
            currentCount: count,
            prevCount: current.currentCount,
            wait: onlyOne,
        }));
    };

    useEffect(() => {
        if (count !== data.currentCount && !data.wait) {
            _changeEvent();
        }
    }, [count]);

    const containerStyle = up(data)
        ? "_ics_columnFlexDirection"
        : "_ics_reverseColumnFlexDirection";

    const spanProps = {
        data,
        time,
        refSpan,
        className,
    };

    return (
        <div
            style={{
                height: refSpan?.current,
            }}
            className={`_ics_container ${containerStyle}`}
        >
            {count !== data.prevCount && (
                <Span {...spanProps} text={data.prevCount} />
            )}
            <Span {...spanProps} finished={_finishedEvent} text={data.currentCount} />
        </div>
    );
});

CounterAnimate.propTypes = {
    count: PropTypes.number,
    animation: PropTypes.string,
    className: PropTypes.object,
    finished: PropTypes.func,
    onlyOne: PropTypes.bool,
};

CounterAnimate.defaultProps = {
    count: 0,
    animation: "default",
    className: {},
    onlyOne: true,
    time: 300,
};

export default CounterAnimate;
