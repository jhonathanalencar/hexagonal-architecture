import { CalculateInvoice } from "./CalculateInvoice";
import { HttpServer } from "./HttpServer";

export class InvoiceController {
  constructor(
    readonly httpServer: HttpServer,
    readonly calculateInvoice: CalculateInvoice
  ) {
    this.httpServer.register(
      "get",
      "/cards/:cardNumber/invoices",
      async (params: any, body: any) => {
        const total = await calculateInvoice.execute(params.cardNumber);
        return total;
      }
    );
  }
}
