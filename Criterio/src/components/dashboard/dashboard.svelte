
<script>
// import './dashboard.css';
    import Criterio from '../criterio/criterio.svelte';
    import Login from '../login/login.svelte';
    
    import { beforeUpdate, afterUpdate } from 'svelte';
    import { listaDeCriterios } from '../../store/store.js';
    import {onMount} from 'svelte'

    onMount(() => {
        listaDeCriteriosPorAgregar.focus()
    })


    let listaDeCriterios_value = [];

    const unsubscribe = listaDeCriterios.subscribe(value => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        console.log(usuario)
        if (usuario) {
            usuario.listaCriterios = value;
            localStorage.setItem('user', JSON.stringify(usuario));
        }
        listaDeCriterios_value = value;
    });


    function _agregarListaCriterios() {
        if (!listaDeCriteriosPorAgregar.value) return

        let listaParseada = listaDeCriteriosPorAgregar.value
            .replace(/\n/g, "<br />")
            .split('|||||')
            .filter(item => !!item);

        listaParseada = listaParseada.map((item, index)=>{
            return {
                value: item,
                criterioIndex: index + listaDeCriterios_value.length + 1,
                comments: [],
                estado: 'default'
            }
        })
        listaDeCriterios.update(()=> [...listaDeCriterios_value, ...listaParseada]);

        listaDeCriteriosPorAgregar.value = '';
        listaDeCriteriosPorAgregar.focus();
    }

    const _eliminar = (a) => {
        let lista = listaDeCriterios_value.filter((item)=>{
            return !(item.criterioIndex === a.detail)
        });
        lista = lista.map((item)=> {
            if (item.criterioIndex > a.detail) {
                item.criterioIndex -= 1; 
            }
            return item
        })
        listaDeCriterios.update(()=> [...lista]);
    }

    function _marcar(id) {
        const index = id.detail -1;
        // const estado = listaDeCriterios_value[index].estado;
        const estado = _estadoPorId(id);
        listaDeCriterios_value[index].estado = estado !== 'default marcado' ? 'default marcado' : 'default';
        listaDeCriterios.update(()=> [...listaDeCriterios_value]);
    }

    function _hecho(id) {
        const index = id.detail -1;
        // const estado = listaDeCriterios_value[index].estado;
        const estado = _estadoPorId(id);

        listaDeCriterios_value[index].estado = estado !== 'default hecho' ? 'default hecho' : 'default';
        listaDeCriterios.update(()=> [...listaDeCriterios_value]);
    }

    function _comentar(arg) {
        const index = arg.detail.id -1;
        listaDeCriterios_value[index].comments = arg.detail.comments;
        listaDeCriterios.update(()=> [...listaDeCriterios_value]);
    }

    function _estadoPorId(id) {
        const index = id.detail -1;
        return listaDeCriterios_value[index].estado;
    }

    function _limpiarListaCriterios() {
        listaDeCriterios.update(()=> []);
    }

</script>

<header>
    <nav class="navMenu">
        <div class="containerLogo">
            <img src="\assets\Criterioso.png" alt="CriteriOso" class="imgLogo">
        </div>
        <Login bind:listaCriterios={listaDeCriterios_value}></Login>
    </nav>
</header>

<div class="lista" id="lista">
    {#each listaDeCriterios_value as criterio}
        <Criterio
            inputValue={criterio.value}
            id={criterio.criterioIndex}
            claseDeLosCriterios={criterio.estado}
            comments={criterio.comments}
            on:eliminar={_eliminar}
            on:marcar={_marcar}
            on:hecho={_hecho}
            on:comentar={_comentar}
        ></Criterio>
	{/each}
</div>

<textarea
    id="listaDeCriteriosPorAgregar"
    class="listaDeCriteriosPorAgregar"></textarea>

<button
    class="agregarCriterios"
    id="agregarCriterios"
    on:click={_agregarListaCriterios}>Agregar</button>

<button
    class="limpiarCriterios"
    id="limpiarCriterios"
    on:click={_limpiarListaCriterios}>Limpiar</button>
























<style>
    * {
        font-family: Verdana, Geneva, Tahoma, sans-serif
    }
    .agregarCriterios {
        border: 1px solid #84B1ED;
        color: #84B1ED;
        background-color: white;
        width: 80px;
    }
    .agregarCriterios:active {
        border: 1px solid #84B1ED;
        color: white;
        background-color: #84B1ED;
    }

    .listaDeCriteriosPorAgregar {
        border: 1px solid #84B1ED;
        background-color: white;
        width: 100%;
        height: 300px;
        resize: none;
    }

    .limpiarCriterios {
        border: 1px solid #C89EC4;
        color: #C89EC4;
        background-color: white;
        width: 80px;
    }

    .lista {
        margin: 25px 0;
    }

    .navMenu {
        display: flex;
        height: 100px;
        justify-content: space-between;
    }

    .imgLogo {
        height: 100%;
    }

    .containerLogo {
        width: 30%;
    }


</style>