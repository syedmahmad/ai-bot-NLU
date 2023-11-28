import { useContext, createContext } from 'react';

const WidgetsContext = createContext({widget: '', addWidget: () => {}});

export const useWidgets = () => {
  const context = useContext(WidgetsContext);
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetsProvider');
  }
  return context;
};

export default WidgetsContext;
