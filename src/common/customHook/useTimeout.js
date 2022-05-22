import React from 'react';

function useTimeout(callback, timeout = 0) {
  const timeoutId = React.useRef();
  const handler = React.useMemo(
    () => ({
      start(overrideTimeout) {
        handler.stop();
        timeoutId.current = setTimeout(callback, overrideTimeout || timeout);
      },

      stop() {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      },

      restart() {
        handler.stop();
        handler.start();
      },
    }),
    [callback, timeout],
  );

  React.useEffect(
    () => () => {
      handler.stop();
    },
    [],
  );

  return handler;
}

export default useTimeout;
