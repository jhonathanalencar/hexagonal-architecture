import pgp from "pg-promise";

import { TransactionDAO } from "./TransactionDAO";

export class TransactionDAODatabase implements TransactionDAO {
  async getTransactions(
    cardNumber: string,
    month: number,
    year: number
  ): Promise<any> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");

    const transactions = await connection.query(
      "SELECT * FROM kenpachi.card_transaction WHERE card_number = $1 AND EXTRACT(month from date) = $2 AND EXTRACT(year from date) = $3",
      [cardNumber, month, year]
    );

    return transactions;
  }
}
