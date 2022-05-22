import React from 'react';

function useInterval(callback, interval) {
  const intervalId = React.useRef();
  const handler = React.useMemo(
    () => ({
      start(overrideInterval) {
        handler.stop();
        intervalId.current = setInterval(
          callback,
          overrideInterval || interval,
        );
      },

      stop() {
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
      },

      restart() {
        handler.stop();
        handler.start();
      },
    }),
    [callback, interval],
  );

  React.useEffect(
    () => () => {
      handler.stop();
    },
    [],
  );

  return handler;
}

export default useInterval;
