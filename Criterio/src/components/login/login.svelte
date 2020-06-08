<script>
    let logueado = !!localStorage.getItem('user');
    $: literalBoton = logueado ? 'DESLOGUEARTE' : 'LOGUEARTE'
    $: nombreUsuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : '';


    import { listaDeCriterios } from '../../store/store.js';
    let listaDeCriterios_value = [];

    const unsubscribe = listaDeCriterios.subscribe(value => {
        console.log("put", value)
        if(logueado) {
            _peticion('user', 'PUT', {
                method: 'PUT',
                body: localStorage.getItem('user'),
                headers:{
                    'Content-Type': 'application/json'
                }})
        }
        listaDeCriterios_value = value;
    });

    function loguearDesloguear(e) {
        e.preventDefault();
        
        if((e.target.nombre && !e.target.nombre.value) || (e.target.pass && !e.target.pass.value)) {
            alert('Tenés que completar todos los campos, no te hagas el QC')
            return
        }
        const metodos = {
            signIn: _signIn,
            signUp: _signUp,
            logout: _logout
        }
            metodos[e.submitter.name](e)
    }

    function _logout() {
        localStorage.removeItem('user');
        logueado = '';
        // listaDeCriterios_value = [];
        listaDeCriterios.update(()=> []);
    }

    function _signUp(e) {
        _peticion('register', 'POST', {
            method: 'POST',
            body: JSON.stringify({
                user: e.target.nombre.value,
                pass: e.target.pass.value,
                listaCriterios: listaDeCriterios_value
            }),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then((item) => item.json())
            .then((usuario) => {
                localStorage.setItem('user', JSON.stringify(usuario));
                listaDeCriterios_value = [];
                nombreUsuario = usuario.user;
                logueado = true;
            })
            .catch((err)=> console.log(err, "error"));
    }

    function _signIn(e) {
        console.log(e)
        const body = JSON.stringify({
                user: e.target.nombre.value,
                pass: e.target.pass.value,
            })
        const params = {
            method: 'POST',
            body,
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const usuario = _peticion('login', 'POST', params)
            .then((item) => item.json())
            .then((item) => {
                localStorage.setItem('user', JSON.stringify(item));
                logueado = !!item.user;
                nombreUsuario = item.user;
                listaDeCriterios.update(()=> [...item.listaCriterios]);
                // listaDeCriterios_value = item.listaCriterios;
            })
            .catch((err)=> console.log(err, "error"))

    }

    function _peticion(url, metodo, params) {
        return fetch('http://localhost:3000/user/' + url, params)
            .then((response) => {
                if (!response.ok) throw Error(response.status);
                return response;
            })
    }
</script>


    <form class="formulario" on:submit={loguearDesloguear}>
        <fieldset class='fieldSetInputs'>
            {#if !logueado}
                <input type="text" id="nombre">
                <input type="password" id="pass">
                {:else}
                    <p class="nombreUsuario">{nombreUsuario}</p>
            {/if}
        </fieldset>
        <fieldset class='fieldSetSubmits'>
            {#if !logueado}
                <input type="submit" value='Sign in' name='signIn' class='signIn'>
                <input type="submit" value='Sign up' name="signUp" class='signUp'>
                {:else}
                    <input type="submit" value='Logout' name='logout' class='logout'>
            {/if}
        </fieldset>

    </form>

<style>
fieldset {
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-block-start: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    padding-block-end: 0;
}
.formulario {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.fieldSetInputs {
    border: 0;
    display: flex;
    flex-direction: column;
    padding-right: 8px;
}
.fieldSetInputs input {
    color: #84B1ED;
    border: 1px solid #84B1ED;
    width: 200px;
}
.fieldSetSubmits {
    width: 100px;
    border: 0;
    display: flex;
    flex-direction: column;
}
.fieldSetSubmits input {
    width: 100%;
    background-color: white;
}
.signIn {
    color: #67D5B5;
    border: 1px solid #67D5B5;
}
.signUp {
    color: #C89EC4;
    border: 1px solid #C89EC4;
}
.logout {
    color: #EE7785;
    border: 1px solid #EE7785;
    margin: 0;
}
.nombreUsuario {
    color: #67D5B5;

}

</style>