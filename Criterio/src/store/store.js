import { writable, derived } from 'svelte/store';
function defaultLista() {
    const usuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    return usuario.listaCriterios || []
}

export const listaDeCriterios = writable(defaultLista());

// export const derivadoCriterios = derived(listaDeCriterios, (a)=>console.log(a));

// function fetchearCriterios() {
//     console.log("esto pasa?")
//     fetch('https://localhost:8010/user')
// }