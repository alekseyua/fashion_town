const padTime = (time) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};

const format = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return '0' + `${minutes}:${padTime(seconds)}`;
};
export default function Timer({ timeInSeconds, onTimerDone }) {
  const [counter, setCounter] = React.useState(timeInSeconds);
  React.useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    } else {
      if(!onTimerDone) return clearTimeout(timer);
      onTimerDone();
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  return <>{counter === 0 ? 'Time over' : <div>{format(counter)}</div>}</>;
}
