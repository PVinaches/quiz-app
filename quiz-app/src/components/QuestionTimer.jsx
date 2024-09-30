import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (<progress id="question-time" max={timeout} value={remainingTime} />);
};

QuestionTimer.propTypes = {
  timeout: PropTypes.any,
  onTimeout: PropTypes.func
};
