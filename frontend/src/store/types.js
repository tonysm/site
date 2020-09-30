export const STATUSES = {
    LOADING: 'LOADING',
    READY: 'READY',
    ERROR: 'ERROR',
};

export const ACTIONS = {
    LOAD_STATES: 'LOAD_STATES',
    LOAD_CANDIDATES: 'LOAD_CANDIDATES',
};

export const MUTATIONS = {
    SET_STATUS: 'SET_STATUS',
    SET_STATES: 'SET_STATES',
    SET_CANDIDATES: 'SET_CANDIDATES',
};

export const ACTION_CREATORS = {
    loadStates: () => ({ type: ACTIONS.LOAD_STATES }),
    setStatus: ({ module, status }) => ({ type: MUTATIONS.SET_STATUS, module, status}),
    setStates: (states = []) => ({ type: MUTATIONS.SET_STATES, states }),
    setCandidates: (candidates) => ({ type: MUTATIONS.SET_CANDIDATES, candidates }),
};