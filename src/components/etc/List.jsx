export function Ulist({ items = [], className = '' }) {
  return (
    <ul className={`ulist${className ? ` ${className}` : ''}`}>
      {items.map((value, index) => (
        <li
          key={index}
          className={`ulist-item${className ? ` ${className}` : ''}`}
        >
          {value}
        </li>
      ))}
    </ul>
  );
}

export function Olist({ items = [], className = '' }) {
  return (
    <ol className={`olist${className ? ` ${className}` : ''}`}>
      {items.map((value, index) => (
        <li
          key={index}
          className={`olist-item${className ? ` ${className}` : ''}`}
        >
          {value}
        </li>
      ))}
    </ol>
  );
}

export function Dlist({ items = [], className = '' }) {
  return (
    <dl className={`dlist${className ? ` ${className}` : ''}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`dlist-pair${className ? ` ${className}` : ''}`}
        >
          <dt className={`dlist-dt${className ? ` ${className}` : ''}`}>
            {item.term}
          </dt>
          <dd className={`dlist-dd${className ? ` ${className}` : ''}`}>
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
