
  let usuariosFiltrados = [];
  let todosUsuarios = [];
  let nomeProcurado = "";
  let numberFormat = null;

const inputName = document.querySelector('#inputName');
const countEncontrados = document.querySelector('#countEcontrados');
const divEncontrados = document.querySelector('#divEncontrados');
const divSumario = document.querySelector('#divSumario');


window.addEventListener('load', () =>{
  
  divEncontrados.textContent='Nenhum usuário pesquisado';
  divSumario.textContent='Nada a ser exibido';

  inputName.addEventListener('input', buscar);
  requisicaoFetch();
})


async function requisicaoFetch(){
  
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

      const usuarios = json.results.map((usuario) => {
        const { name, picture, dob, gender } = usuario;
  
        return {
          name: `${name.first} ${name.last}`,
          picture: picture.thumbnail,
          age: dob.age,
          gender,
        }
      });

    todosUsuarios = [...usuarios];
    usuariosFiltrados = [...usuarios];
}

const buscar = (nome) => {

  nomeProcurado = nome.target.value.toLocaleLowerCase().trim();
  if(nomeProcurado){
    filtrarBusca();
  }
  else{
    divEncontrados.textContent='Nenhum usuário pesquisado';
    divSumario.textContent='Nada a ser exibido';
  }
  
  console.log(nomeProcurado);

}

const filtrarBusca = () =>{
  
  const carregando = (usuario) =>{
    const {name, picture, age} = usuario;
    return`
    <div class='col s12 m6 l4'>
      <div class='foto'>
        <img class='img' src="${picture}"/>
      <div class='dados'>
        <span>${name},</span>
        <span> ${age} anos </span>
          </div>
        </div>
      </div>`;
  }


  const carregarUsuarios = () =>{

  const mostrarUsuarios = usuariosFiltrados.map(usuario =>{
    return carregando(usuario);
  })
  .join("")    

  const carregarHTML = `
    <div>
      <h2>${usuariosFiltrados.length} usuário(s) encontrado(s)</h2>
      <div class='row'>${mostrarUsuarios}</div>      
    </div>`;
      
    divEncontrados.innerHTML = carregarHTML;
  }  


  let usuariosFiltrados = [...todosUsuarios];


  if(nomeProcurado){
    usuariosFiltrados = usuariosFiltrados.filter(buscarNome =>
      buscarNome.name.toLocaleLowerCase().includes(nomeProcurado));
  }
  usuariosFiltrados = [...usuariosFiltrados];
  console.log(usuariosFiltrados);
  carregarUsuarios();
  
  const totalAge = usuariosFiltrados.reduce((acc, crr) =>{
    return Number(acc + crr.age)
  }, 0);

  const male = usuariosFiltrados.filter(usuario => usuario.gender ===  'male');
  const female = usuariosFiltrados.filter(usuario => usuario.gender === 'female');
  const med = Number(totalAge/usuariosFiltrados.length).toFixed(1);

  if(nomeProcurado){
    const SumarioHTML = `
    <div class='dados'>
      <h2>Estatísticas<h2>
      <h6>Sexo masculino: ${male.length}.</h6>
      <h6>Sexo feminino: ${female.length}.</h6>
      <h6>Soma das idades: ${totalAge} anos.</h6>
      <h6>Média das idades: ${med} anos.</h6>
    </div>`

    divSumario.innerHTML = SumarioHTML;
  }
  else{
    divSumario.textContent = `Nada a ser exibido`
  }
}