import express, { Application, Express } from "express"


export default function ExpressApp(): Application {
  const app = express();
  app.use(express.json());

  app.get(
    "/",
    (req, res) => {
      res.status(200).json({ message: "up" })
    }
  );

  return app
}
