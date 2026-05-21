type FAQItem = {
  q: string;
  a: string;
};

type Props = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: Props) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
