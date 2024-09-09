import { NextFunction, Request, Response } from "express";
import logger from "../util/logger.util";
import { ResponseBody } from "../types/express";

function requestContext(req: Request, res: Response, next: NextFunction) {
  const start = Date.now(); // Record the start time of the request



  req.log = logger;

  // Capture the original 'res.json' method
  const originalJson = res.json.bind(res);

  // Create a variable to store the response body
  let responseBody: ResponseBody;

  // Intercept the 'res.json' method
  res.json = function(body: any) {
    // Store the response body
    responseBody = body;

    // Call the original 'res.json' method
    originalJson.call(this, body);

    return this; // Return the response object for chaining
  };

  // Hook into the 'finish' event to log the request and response information
  res.on("finish", () => {
    const usedMemory = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    // console.log(usedMemory.heapUsed, usedMemory.heapTotal);

    const currentMemoryUsage = `${usedMemory.heapUsed / 1024 / 1204} mb`;

    const currentCpuUsed = `${(cpuUsage.user + cpuUsage.system) / 1000000} ms`; // Convert nanoseconds to milliseconds

    const end = Date.now(); // Record the end time of the response
    res.body = responseBody;
    // Log the request and response information
    logger.info({
      req: {
        method: req.method,
        url: `${req.protocol}://${req.get("host")}${req.path}`,
        headers: req.headers,
        body: req.body,
      },
      res: {
        statusCode: res.statusCode,
        headers: res.getHeaders(),
        body: res.body,
      },
      duration: end - start,
      message: "Request and response logged",
      currentMemoryUsage,
      currentCpuUsed,
    });
  });

  // Add traceId to context and call the next function
  next
}

export default requestContext;
