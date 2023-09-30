import express from "express";
import { CalculateInvoice } from "./CalculateInvoice";
import { TransactionDAODatabase } from "./TransactionDAODatabase";
import { CurrencyGatewayHttp } from "./CurrencyGatewayHttp";
import { AxiosAdapter } from "./AxiosAdapter";
import { PgPromiseAdapter } from "./PgPromiseAdapter";
import { InvoiceController } from "./InvoiceController";

const connection = new PgPromiseAdapter();
const transactionDAO = new TransactionDAODatabase(connection);

const httpClient = new AxiosAdapter();
const baseUrl = "http://localhost:3001";
const currencyGateway = new CurrencyGatewayHttp(httpClient, baseUrl);

const calculateInvoice = new CalculateInvoice(transactionDAO, currencyGateway);
new InvoiceController(calculateInvoice);
