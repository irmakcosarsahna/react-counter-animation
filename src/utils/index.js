const up = ({ currentCount, prevCount }) => currentCount > prevCount;
const down = (props) => !up(props);

const msConvert = (t) => (t / 1000) % 60;

export { up, down, msConvert };
