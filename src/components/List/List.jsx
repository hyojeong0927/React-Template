export function Ulist({ items = [], className = '' }) {
  return (
    <ul className={`ulist ${className}`}>
      {items.map((value, index) => (
        <li key={index} className={`ulist-item ${className}`}>
          {value}
        </li>
      ))}
    </ul>
  );
}

export function Olist({ items = [], className = '' }) {
  return (
    <ol className={`olist ${className}`}>
      {items.map((value, index) => (
        <li key={index} className={`olist-item ${className}`}>
          {value}
        </li>
      ))}
    </ol>
  );
}

export function Dlist({ items = [], className = '' }) {
  return (
    <dl className={`dlist ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={`dlist-pair ${className}`}>
          <dt className={`dlist-dt ${className}`}>{item.term}</dt>
          <dd className={`dlist-dd ${className}`}>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
