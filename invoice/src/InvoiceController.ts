import express from "express";

import { CalculateInvoice } from "./CalculateInvoice";

export class InvoiceController {
  constructor(readonly calculateInvoice: CalculateInvoice) {
    const app = express();

    app.get("/cards/:cardNumber/invoices", async (req, res) => {
      const total = await calculateInvoice.execute(req.params.cardNumber);

      res.json({
        total,
      });
    });

    app.listen(3000);
  }
}
