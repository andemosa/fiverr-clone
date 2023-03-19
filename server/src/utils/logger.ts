import log from "pino";
import dayjs from "dayjs";

const logger = log({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
