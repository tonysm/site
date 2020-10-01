export const STATUSES = {
    LOADING: 'LOADING',
    READY: 'READY',
    ERROR: 'ERROR',
};

export const ACTIONS = {
    LOAD_STATES: 'LOAD_STATES',
    LOAD_CITIES: 'LOAD_CITIES',
    LOAD_CANDIDATES: 'LOAD_CANDIDATES',
};

export const MUTATIONS = {
    SET_STATUS: 'SET_STATUS',
    SET_CITIES: 'SET_CITIES',
    SET_STATES: 'SET_STATES',
    SET_CANDIDATES: 'SET_CANDIDATES',
};

export const ACTION_CREATORS = {
    loadStates: () => ({ type: ACTIONS.LOAD_STATES }),
    setStatus: ({ module, status }) => ({ type: MUTATIONS.SET_STATUS, module, status}),
    setStates: (states = []) => ({ type: MUTATIONS.SET_STATES, states }),
    setCities: (cities = []) => ({ type: MUTATIONS.SET_CITIES, cities }),
    setCandidates: (candidates) => ({ type: MUTATIONS.SET_CANDIDATES, candidates }),
};