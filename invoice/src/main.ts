import express from "express";
import { CalculateInvoice } from "./CalculateInvoice";
import { TransactionDAODatabase } from "./TransactionDAODatabase";
import { CurrencyGatewayHttp } from "./CurrencyGatewayHttp";

const app = express();

app.get("/cards/:cardNumber/invoices", async (req, res) => {
  const transactionDAO = new TransactionDAODatabase();
  const currencyGateway = new CurrencyGatewayHttp();

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
