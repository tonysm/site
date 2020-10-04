export const STATUSES = {
    LOADING: 'LOADING',
    READY: 'READY',
    ERROR: 'ERROR',
};

export const ACTIONS = {
    LOAD_STATES: 'LOAD_STATES',
    LOAD_CITIES: 'LOAD_CITIES',
    LOAD_CANDIDATES: 'LOAD_CANDIDATES',
    REQUEST_CANDIDATE_ACCESS: 'REQUEST_CANDIDATE_ACCESS',
    UPDATE_CANDIDATE: 'UPDATE_CANDIDATE',
    SEND_MESSAGE: 'SEND_MESSAGE',
};

export const MUTATIONS = {
    SET_STATUS: 'SET_STATUS',
    SET_CITIES: 'SET_CITIES',
    SET_STATES: 'SET_STATES',
    SET_CANDIDATES: 'SET_CANDIDATES',
};

export const ACTION_CREATORS = {
    sendMessage: ({type, subject, description}) => ({
        type: ACTIONS.SEND_MESSAGE,
        message: {type, subject, description}
    }),
    loadStates: () => ({type: ACTIONS.LOAD_STATES}),
    requestAccess: (email = '') => ({type: ACTIONS.REQUEST_CANDIDATE_ACCESS, email}),
    updateCandidate: ({biography, description, tags = [], contato: {link, social_network},}) => ({
        type: ACTIONS.UPDATE_CANDIDATE, candidate: {
            contato: {link, social_network},
            biography,
            description,
            tags,
        },
    }),
    setStatus: ({module, status}) => ({type: MUTATIONS.SET_STATUS, module, status}),
    setStates: (states = []) => ({type: MUTATIONS.SET_STATES, states}),
    setCities: (cities = []) => ({type: MUTATIONS.SET_CITIES, cities}),
    setCandidates: (candidates) => ({type: MUTATIONS.SET_CANDIDATES, candidates}),
};