import CostItem from "./CostItem";
import TotalCost from "./TotalCost";

export default function Component() {
  return (
    <article className="bg-muted p-6 rounded-lg">
      <CostItem label="Monthly Charge" amount="$0.00" />
      <CostItem label="Service Charge" amount="$0.00" />
      <CostItem label="App Service Fee" amount="$0.09" />
      <hr className="my-4" />
      <TotalCost label="Total Cost" amount="$0.09" />
    </article>
  );
}
