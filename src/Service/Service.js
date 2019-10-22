import config from '../config';

export const deleteTripFetch = tripId => {
  return fetch(`${config.API_ENDPOINT}/trips/${tripId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  })
}

export const deletePlanFetch = planId => {
  return fetch(`${config.API_ENDPOINT}/plans/${planId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  })
}

export const addTripFetch = newTrip => {
  return fetch(`${config.API_ENDPOINT}/trips`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newTrip)
  })
}

export const addPlanFetch = newPlan => {
  return fetch(`${config.API_ENDPOINT}/plans`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newPlan)
  })
}

export const getPlansForTrip = (plans = [], tripId) => (
  (!tripId)
    ? plans
    : plans.filter(plan => plan.trip_id === Number(tripId))
)

