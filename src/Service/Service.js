import config from '../config';
import TokenService from '../Service/Token-service';

export const deleteTripFetch = tripId => {
  return fetch(`${config.API_ENDPOINT}/trips/${tripId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TokenService.getAuthToken()}`
    }
  })
}

export const deletePlanFetch = planId => {
  return fetch(`${config.API_ENDPOINT}/plans/${planId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TokenService.getAuthToken()}`
    }
  })
}

export const addTripFetch = newTrip => {
  return fetch(`${config.API_ENDPOINT}/trips`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(newTrip)
  })
}

export const addPlanFetch = newPlan => {
  return fetch(`${config.API_ENDPOINT}/plans`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(newPlan)
  })
}

export const getPlansForTrip = (plans = [], tripId) => (
  (!tripId)
    ? plans
    : plans.filter(plan => plan.trip_id === Number(tripId))
)

