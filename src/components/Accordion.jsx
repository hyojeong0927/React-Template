import { useState, useRef, useEffect } from 'react';

export default function Accordion({ items, allowMultipleOpen = false }) {
  const [openIndexes, setOpenIndexes] = useState([]);
  const contentRefs = useRef([]);

  const toggleIndex = index => {
    if (allowMultipleOpen) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter(i => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes[0] === index ? [] : [index]);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  useEffect(() => {
    // 열린 항목에 맞게 높이 조절
    openIndexes.forEach(i => {
      const el = contentRefs.current[i];
      if (el) {
        el.style.height = el.scrollHeight + 'px';
      }
    });

    // 닫힌 항목 높이 0
    items.forEach((_, i) => {
      if (!openIndexes.includes(i) && contentRefs.current[i]) {
        contentRefs.current[i].style.height = '0px';
      }
    });
  }, [openIndexes, items]);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={index}
            className="accordion-item"
            style={{ marginBottom: '5px' }}
          >
            {/* Header */}
            <div
              id={`accordion-header-${index}`}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              className="accordion-header"
              onClick={() => toggleIndex(index)}
              onKeyDown={e => handleKeyDown(e, index)}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                background: '#f0f0f0',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                userSelect: 'none',
              }}
            >
              <span>{item.title}</span>
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform 0.3s',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  fontSize: '20px',
                }}
              >
                +
              </span>
            </div>

            {/* Content */}
            <div
              id={`accordion-content-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`}
              ref={el => (contentRefs.current[index] = el)}
              style={{
                height: 0,
                overflow: 'hidden',
                transition: 'height 0.3s ease',
                background: '#fafafa',
                padding: '0 20px',
              }}
            >
              <div style={{ padding: '10px 0' }}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
