<script>
    // import './colorBlocks.css'
    export let colors = ['red', 'blue', 'green'];
    
    let listaDeCuadrados = [];

    colors.forEach((item)=> {
        listaDeCuadrados.push(
            `<div style="background-color:${item};">hola</div>`
        )
    })

    let contenido = listaDeCuadrados.join('')

</script>

<aside>
    {@html contenido}
</aside>