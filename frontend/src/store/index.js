import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types';

Vue.use(Vuex)

const fakeHttp = (data) => {
    return new Promise((resolve) => {
        // Pretend to be an AJAX request.
        setTimeout(() => {
            resolve(data);
        }, 600);
    })
}

const fakeCandidates = [
    { id: 1, name: 'Maria da Silva', transparency: 50, city: 'Maceió', state: 'AL', position: 'Vereador', number: '12345', party: 'PX', ruling: ['Veganismo', 'Cultura', 'Urbanismo'] },
    { id: 2, name: 'Maria da Silva', transparency: 30, city: 'Maceió', state: 'AL', position: 'Vereador', number: '12345', party: 'PX', ruling: ['Veganismo', 'Cultura', 'Urbanismo'] },
    { id: 3, name: 'Maria da Silva', transparency: 50, city: 'Maceió', state: 'AL', position: 'Vereador', number: '12345', party: 'PX', ruling: ['Veganismo', 'Cultura', 'Urbanismo'] },
    { id: 4, name: 'Maria da Silva', transparency: 98, city: 'Maceió', state: 'AL', position: 'Vereador', number: '12345', party: 'PX', ruling: ['Veganismo', 'Cultura', 'Urbanismo'] },
    { id: 5, name: 'Maria da Silva', transparency: 90, city: 'Maceió', state: 'AL', position: 'Vereador', number: '12345', party: 'PX', ruling: ['Veganismo', 'Cultura', 'Urbanismo'] },
    { id: 6, name: 'Maria da Silva', transparency: 67, city: 'Maceió', state: 'AL', position: 'Vereador', number: '12345', party: 'PX', ruling: ['Veganismo', 'Cultura', 'Urbanismo'] },
    { id: 7, name: 'Maria da Silva', transparency: 10, city: 'Maceió', state: 'AL', position: 'Vereador', number: '12345', party: 'PX', ruling: ['Veganismo', 'Cultura', 'Urbanismo'] },
];

export default new Vuex.Store({
    state: {
        team: [
            {
                name: 'Ana Paula Gomes',
                profile_image: '/img/team/ana.jpeg',
                position: 'Pitaqueira',
                socials: [
                    { provider: 'github', link: 'https://twitter.com/anapaulagomes' },
                ]
            },
            {
                name: 'Aurélio Buarque',
                profile_image: '/img/team/aurelio.jpeg',
                position: 'Desenvolvedor',
                socials: [
                    { provider: 'github', link: 'https://github.com/ABuarque' },
                    { provider: 'twitter', link: 'https://twitter.com/abuarquemf' },
                    { provider: 'linkedin', link: 'https://www.linkedin.com/in/aurelio-buarque/' },
                ]
            },
            {
                name: 'Bruno Morassuti',
                profile_image: '/img/team/bruno.jpeg',
                position: 'Palpiteiro jurídico',
                socials: [
                    { provider: 'github', link: 'https://github.com/jedibruno' },
                ]
            },
            {
                name: 'Daniel Fireman',
                profile_image: '/img/team/daniel.jpeg',
                position: 'Coordenador',
                socials: [
                    { provider: 'twitter', link: 'https://twitter.com/daniellfireman' },
                    { provider: 'github', link: 'https://github.com/danielfireman' }
                ]
            },
            {
                name: 'Eduardo Cuducos',
                profile_image: '/img/team/eduardo.jpeg',
                position: 'Palpiteiro',
                socials: [
                    { provider: 'twitter', link: 'https://twitter.com/cuducos' },
                    { provider: 'github', link: 'https://github.com/cuducos' },
                ]
            },
            {
                name: 'Evelyn Gomes',
                profile_image: '/img/team/evelyn.jpeg',
                position: 'Articuladora',
                socials: [
                    { provider: 'instagram', link: 'https://www.instagram.com/evygomes' },
                ]
            },
            {
                name: 'Laura Cavalcante',
                profile_image: '/img/team/laura.jpeg',
                position: 'Advogada',
                socials: [
                    { provider: 'instagram', link: 'https://www.instagram.com/lauracavalcante/' },
                ]
            },
            {
                name: 'Mariana Souto',
                profile_image: '/img/team/mariana.jpeg',
                position: 'Designer',
                socials: [
                    { provider: 'github', link: 'https://github.com/soutoam' },
                    { provider: 'instagram', link: 'https://www.instagram.com/soutoam/' },
                    { provider: 'linkedin', link: 'https://www.linkedin.com/in/soutomariana/' },
                ]
            },
        ],
        states: {
            status: types.STATUSES.READY,
            data: [],
        },
        candidates: {
            status: types.STATUSES.READY,
            data: [],
        },
        cities: {
            status: types.STATUSES.READY,
            data: [],
        },
        positions: [
            { label: 'Vereador', value: 'vereador' },
            { label: 'Prefeito', value: 'prefeito' },
        ],
        tags: [
            'Urbanismo',
            'Veganismo',
            'Ciclismo',
        ],
    },
    mutations: {
        [types.MUTATIONS.SET_STATUS] (state, { module, status }) {
            state[module].status = status;
        },
        [types.MUTATIONS.SET_STATES] (state, { states }) {
            state.states.data = states;
            state.states.status = types.STATUSES.READY;
        },
        [types.MUTATIONS.SET_CANDIDATES] (state, { candidates }) {
            state.candidates.data = candidates;
            state.candidates.status = types.STATUSES.READY;
        },
        [types.MUTATIONS.SET_CITIES] (state, { cities }) {
            state.cities.data = cities;
            state.candidates.status = types.STATUSES.READY;
        },
    },
    actions: {
        [types.ACTIONS.LOAD_CITIES] ({ commit }) {
            commit(types.ACTION_CREATORS.setStatus({ module: 'cities', status: types.STATUSES.LOADING }));

            return fakeHttp(['Maceió', 'Arapiraca'])
                .then((data) => {
                    commit(types.ACTION_CREATORS.setCities(data));
                })
        },
        [types.ACTIONS.LOAD_STATES] ({ commit }) {
            commit(types.ACTION_CREATORS.setStatus({ module: 'states', status: types.STATUSES.LOADING }));

            return fakeHttp(['AL'])
                .then((data) => {
                    commit(types.ACTION_CREATORS.setStates(data));
                })
        },
        [types.ACTIONS.LOAD_CANDIDATES] ({ commit }) {
            commit(types.ACTION_CREATORS.setStatus({ module: 'candidates', status: types.STATUSES.LOADING }));

            return fakeHttp(fakeCandidates)
                .then(data => {
                    commit(types.ACTION_CREATORS.setCandidates(data));
                });
        },
        [types.ACTIONS.REQUEST_CANDIDATE_ACCESS] (_ctx, { email }) {
            return fakeHttp(email);
        },
        [types.ACTIONS.UPDATE_CANDIDATE] (_ctx, { candidate }) {
            return fakeHttp(candidate);
        },
    },
    modules: {}
})
