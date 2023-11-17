import React, { useMemo, useState } from 'react';
import WidgetsContext from './WidgetsContext';

function WidgetsProvider({ children }) {
  const [widget, setWidget] = useState('');

  const updateWidget = (widgetType) => {
    setWidget(widgetType);
  };

  const value = useMemo(() => ({
    widget, updateWidget
  }), [widget, updateWidget])

  return (
    <WidgetsContext.Provider value={value}>
      {children}
    </WidgetsContext.Provider>
  );
}

export default WidgetsProvider;
