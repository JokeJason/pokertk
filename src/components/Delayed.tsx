import React, { useState, useEffect } from 'react';

type DelayedProps = {
  waitBeforeShow: number;
  children: React.ReactNode;
};

const Delayed = ({ waitBeforeShow, children }: DelayedProps) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return <>{isShown ? children : null}</>;
};

export default Delayed;
