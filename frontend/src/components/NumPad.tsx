interface NumPadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
}

const SUB_LABELS: Record<string, string> = {
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ',
};

const KEYS = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  '', '0', 'del',
];

const NumPad = ({ onPress, onDelete }: NumPadProps) => {
  return (
    <div className="numpad">
      <div className="numpad-grid">
        {KEYS.map((key, idx) => {
          if (!key) {
            return <div key={idx} className="numpad-key-empty" />;
          }

          if (key === 'del') {
            return (
              <button
                key={idx}
                type="button"
                className="numpad-key-delete"
                onClick={onDelete}
                aria-label="Delete"
              >
                <svg width="24" height="18" viewBox="0 0 28 20" fill="none">
                  <path
                    d="M10 1H25C26.1 1 27 1.9 27 3V17C27 18.1 26.1 19 25 19H10L1 10L10 1Z"
                    stroke="#222"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <line x1="13" y1="6.5" x2="21" y2="13.5" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="21" y1="6.5" x2="13" y2="13.5" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            );
          }

          return (
            <button
              key={idx}
              type="button"
              className="numpad-key"
              onClick={() => onPress(key)}
            >
              <span className="numpad-num">{key}</span>
              {SUB_LABELS[key] && <span className="numpad-sub">{SUB_LABELS[key]}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NumPad;
