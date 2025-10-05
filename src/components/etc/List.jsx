export function Ulist({ items = [], className = '' }) {
  return (
    <ul className={`ulist list-disc pl-6 ${className}`}>
      {items.map((value, index) => (
        <li key={index} className={`ulist-item mb-1 ${className}`}>
          {value}
        </li>
      ))}
    </ul>
  );
}

export function Olist({ items = [], className = '' }) {
  return (
    <ol className={`olist list-decimal pl-6 ${className}`}>
      {items.map((value, index) => (
        <li key={index} className={`olist-item mb-1 ${className}`}>
          {value}
        </li>
      ))}
    </ol>
  );
}

export function Dlist({ items = [], className = '' }) {
  return (
    <dl className={`dlist space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={`dlist-pair ${className}`}>
          <dt className={`dlist-dt font-semibold ${className}`}>{item.term}</dt>
          <dd className={`dlist-dd ml-4 ${className}`}>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
