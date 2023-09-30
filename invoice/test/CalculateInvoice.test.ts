import { CalculateInvoice } from "../src/CalculateInvoice";

test("Deve calcular a fatura", async () => {
  const calculateInvoice = new CalculateInvoice();
  const total = await calculateInvoice.execute("1234");
  expect(total).toBe(1150);
});
