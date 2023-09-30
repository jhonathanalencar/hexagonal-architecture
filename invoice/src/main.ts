import express from "express";
import { CalculateInvoice } from "./CalculateInvoice";
import { TransactionDAODatabase } from "./TransactionDAODatabase";
import { CurrencyGatewayHttp } from "./CurrencyGatewayHttp";
import { AxiosAdapter } from "./AxiosAdapter";
import { PgPromiseAdapter } from "./PgPromiseAdapter";

const app = express();

app.get("/cards/:cardNumber/invoices", async (req, res) => {
  const connection = new PgPromiseAdapter();
  const transactionDAO = new TransactionDAODatabase(connection);

  const httpClient = new AxiosAdapter();
  const baseUrl = "http://localhost:3001";

  const currencyGateway = new CurrencyGatewayHttp(httpClient, baseUrl);

  const calculateInvoice = new CalculateInvoice(
    transactionDAO,
    currencyGateway
  );

  const total = await calculateInvoice.execute(req.params.cardNumber);

  res.json({
    total,
  });
});

app.listen(3000);
