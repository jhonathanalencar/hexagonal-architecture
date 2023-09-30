import { TransactionDAO } from "./TransactionDAO";
import { Connection } from "./Connection";

export class TransactionDAODatabase implements TransactionDAO {
  constructor(readonly connection: Connection) {}

  async getTransactions(
    cardNumber: string,
    month: number,
    year: number
  ): Promise<any> {
    const transactions = await this.connection.query(
      "SELECT * FROM kenpachi.card_transaction WHERE card_number = $1 AND EXTRACT(month from date) = $2 AND EXTRACT(year from date) = $3",
      [cardNumber, month, year]
    );

    return transactions;
  }
}
