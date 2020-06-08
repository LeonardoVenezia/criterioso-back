<script>

    import { createEventDispatcher } from 'svelte';

    export let claseDeLosCriterios;
    export let inputValue = '';
    export let id;
    export let comments = [];

    let commentBox = false;
    import { listaDeCriterios } from '../../store/store.js';
    let listaDeCriterios_value = [];
    const unsubscribe = listaDeCriterios.subscribe(value => {
        listaDeCriterios_value = value;
    });


    const dispatch = createEventDispatcher();

    function btnHechoFallback() {
        dispatch("hecho", id)

    }
    function btnMarcarFallback() {
        dispatch("marcar", id)
    }
    function btnEliminarFallback() {
        dispatch("eliminar", id)
    }
    function btnCommentarFallback() {
        commentBox = !commentBox;
    }
    function btnEliminarComentario(e) {
        const comments_value = comments.filter((item)=> item.id != e.target.id);
        comments = [...comments_value];
        dispatch("comentar", {id, comments, listaDeCriterios_value});
    }
    function btnDejarComentario() {
        if (btnInput.value) {
            comments = [...comments, {value: btnInput.value, id: comments.length}];
            btnInput.value = '';
            dispatch("comentar", {id, comments, listaDeCriterios_value});
        }
    }

</script>

<div class={claseDeLosCriterios}>
    <div class="criterio">
        <p class="criterio">{@html inputValue}</p>
    </div>
    <div class="botones">
        <button class="btn btnHecho" on:click={btnHechoFallback}>Hecho</button>
        <button class="btn btnMarcar" on:click={btnMarcarFallback}>Marcar</button>
        <button class="btn btnEliminar" on:click={btnEliminarFallback}>Eliminar</button>
        <button class="btn btnCommentar" on:click={btnCommentarFallback}>Comentar</button>
    </div>
</div>
<div class="commentBoxContainer">
    {#if commentBox}
        <div class="commentBox">
            <input class="commentInput" id="btnInput" type="text">
            <button class="commentBtn" on:click={btnDejarComentario}>Enviar</button>
        </div>
    {/if}
    {#each comments as comment}
        <div class="commentBoxComentarios">
        <p>{comment.value}</p>
            <button
                id={comment.id}
                class="btncito btnEliminarComentario"
                on:click={btnEliminarComentario}>X</button>
        </div>
    {/each}
</div>








































<style>
    .default {
        border: 1px solid #84B1ED;
        display: flex;
        flex-wrap: wrap;
        margin: 16px 0;
    }

    /* 
        CRITERIO
    */
    .criterio {
        width: 82%;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .criterio p {
        margin: 16px;
    }

    .hecho {
        border: 1px solid #67D5B5;
    }
    .hecho .criterio {
        text-decoration: line-through;
        color: #67D5B5;
    }

    .marcado {
        border: 1px dotted #C89EC4;
        background-color: rgb(255, 249, 254);
    }
    .marcado .criterio {
        color: #C89EC4;
    }
    /* 
        BOTONES
    */
    .btncito {
        width: 32px;
        height: 32px;
        margin: 0;
        padding: 0;
        background-color: white;
    }
    .botones {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 18%;
    }
    .btn {
        background-color: white;
        width: 90px;
        margin: 5px;
        text-decoration: none;
    }

    .btnHecho {
        border: 1px solid #67D5B5;
        color: #67D5B5;
    }
    .btnHecho:active {
        border: 1px solid #67D5B5;
        color: white;
        background-color: #67D5B5;
    }

    .btnMarcar {
        border: 1px solid #C89EC4;
        color: #C89EC4;
    }
    .btnMarcar:active {
        border: 1px solid #C89EC4;
        color: white;
        background-color: #C89EC4;
    }

    .btnEliminar {
        border: 1px solid #EE7785;
        color: #EE7785;
    }
    .btnEliminar:active {
        border: 1px solid #EE7785;
        color: white;
        background-color: #EE7785;
    }

    /*
        COMENTARIOS
    */

    .commentBox {
        width: 84%;
        margin: 0 8%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .commentBoxComentarios {
        width: 84%;
        margin: 16px 8% 0;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .commentBoxComentarios p {
        margin: 16px; 
    }
    .commentBoxContainer {
        width: 100%;
    }
    .commentInput {
        margin: 0;
        background-color: white;
        width: 80%;
    }
    .commentBtn {
        margin: 0;
        background-color: white;
        min-width: 15%;
        border: 1px solid #84B1ED;
        color: #84B1ED;
    }
    .btnEliminarComentario {
        margin-right: 16px;
        border: 1px solid #EE7785;
        color: #EE7785;
    }
</style>