import type { AssignmentCardType, AssingmentCardList } from "../types/assignment.type";
import AssignmentCard from "./assignment-card";

export default function AssignmentCardList({ cards }: { cards: AssingmentCardList }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card: AssignmentCardType) => (
        <AssignmentCard key={card.id} card={card} />
      ))}
    </div>
  );
}
