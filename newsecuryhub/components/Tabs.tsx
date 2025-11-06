import { ReactNode, useState } from 'react';
import clsx from 'clsx';

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultTab }: { items: TabItem[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab || items[0]?.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 rounded-full bg-white/5 p-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={clsx(
              'rounded-full px-5 py-2 text-sm font-semibold transition',
              active === item.id
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40'
                : 'text-white/70 hover:text-white'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        {items.map((item) => (
          <div key={item.id} className={clsx({ hidden: active !== item.id })}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
