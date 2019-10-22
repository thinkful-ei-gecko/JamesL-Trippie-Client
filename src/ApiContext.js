import React from 'react';

export default React.createContext({
  trips: [],
  plans: [],
  addNewTrip: () => {},
  addPlan: () => {},
  updatePlan: () => {},
  deleteTrip: () => {},
  deletePlan: () => {}
});