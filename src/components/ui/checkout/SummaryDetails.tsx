import { currencyFormat } from "@/utils";

interface Props {
    items : number;
    subTotal : number;
    total : number;
    tax : number;
}

export const SummaryDetails = ({items, subTotal, total, tax} : Props) => {
  return (
    <div className="grid grid-cols-2">
      <span># of Products</span>
      <span className="text-right">
        {items === 1 ? "1 item" : `${items} items`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right font-bold">
        {currencyFormat(total)}
      </span>
    </div>
  );
};
