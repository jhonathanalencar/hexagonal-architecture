import axios from "axios";
import pgp from "pg-promise";

export class CalculateInvoice {
  constructor() {}

  async execute(cardNumber: string) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const response = await axios.get("http://localhost:3001/currencies");
    const currencies = response.data;

    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");

    const transactions = await connection.query(
      "SELECT * FROM kenpachi.card_transaction WHERE card_number = $1 AND EXTRACT(month from date) = $2 AND EXTRACT(year from date) = $3",
      [cardNumber, month, year]
    );

    let total = 0;
    for (const transaction of transactions) {
      if (transaction.currency === "BRL") {
        total += parseFloat(transaction.amount);
      }
      if (transaction.currency === "USD") {
        total += parseFloat(transaction.amount) * currencies.usd;
      }
    }

    return total;
  }
}
