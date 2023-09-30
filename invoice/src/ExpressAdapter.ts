import express from "express";

import { HttpServer } from "./HttpServer";

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
  }

  async register(
    method: string,
    url: string,
    callback: Function
  ): Promise<void> {
    this.app[method](url, async (req: any, res: any) => {
      const output = await callback(req.params, req.body);

      return res.json(output);
    });
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port);
  }
}
