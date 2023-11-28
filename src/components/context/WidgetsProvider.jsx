import React, { useMemo, useState } from 'react';
import WidgetsContext from './WidgetsContext';

function WidgetsProvider({ children }) {
  const [widget, setWidget] = useState('');

  const addWidget = (widgetType) => {
    setWidget(widgetType);
  };

  const value = useMemo(() => ({
    widget, addWidget
  }), [widget, addWidget])

  return (
    <WidgetsContext.Provider value={value}>
      {children}
    </WidgetsContext.Provider>
  );
}

export default WidgetsProvider;
