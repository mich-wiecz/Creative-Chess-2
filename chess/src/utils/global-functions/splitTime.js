export const formatTimeToString = (time) => {
    if (time <= 9) {
      return "0" + time;
    } else {
      return "" + time;
    }
  };
  
  export const splitTime = (
    timeInSeconds,
    configuration
  ) => {
  
    const {  withoutHours = false } = configuration;
  
    const getSeconds = (time) => Math.floor(time % 60);
  
    if (withoutHours) {
      const getMinutes = (time) => Math.floor(time / 60);
  
      const minutes = getMinutes(timeInSeconds);
      const seconds = getSeconds(timeInSeconds);
  
      return {
        minutes: formatTimeToString(minutes),
        seconds: formatTimeToString(seconds),
      };
    } else {
      const getHours = (time) => Math.floor(time / 60 ** 2);
      const getMinutes = (time) => Math.floor(time / 60 - hours * 60);
  
      const hours = getHours(timeInSeconds);
      const minutes = getMinutes(timeInSeconds);
      const seconds = getSeconds(timeInSeconds);
  
      return {
        hours: formatTimeToString(hours),
        minutes: formatTimeToString(minutes),
        seconds: formatTimeToString(seconds),
      };
    }
  };