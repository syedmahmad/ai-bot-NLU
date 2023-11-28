import React, { useMemo, useState } from 'react';
import WidgetsContext from './WidgetsContext';

function WidgetsProvider({ children }) {
  const [widget, setWidget] = useState('');
  const [selectedComp, setSelectedComp] = useState('');

  const addWidget = (widgetType) => {
    setWidget(widgetType);
  };

  const updateSelectedComp = (selectedNode) => {
    setSelectedComp(selectedNode);
  };

  const value = useMemo(() => ({
    widget, addWidget, selectedComp, updateSelectedComp
  }), [widget, addWidget, selectedComp, updateSelectedComp])

  return (
    <WidgetsContext.Provider value={value}>
      {children}
    </WidgetsContext.Provider>
  );
}

export default WidgetsProvider;
