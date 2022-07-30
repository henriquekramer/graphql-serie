const db = require('../../../db')

function geradorDeId(lista){
  let novoId
  let ultimo = lista[lista.length - 1]
  if(!ultimo){
    novoId = 0
  } else {
    novoId = ultimo.id
  }
  return ++novoId
}


module.exports = {
  Contato: {
    perfil(contato){
      return db.perfis.find(p => p.id === contato.perfil_id)
    }
  },
  Query: {
    contato(_, { filtro: { id, email} }){
      return buscarContatoFiltro(id ? { id } : { email })
    },
    contatos: ()=> db.contatos
  },
  Mutation: {
    criarContato(_, { data }){
      const { email } = data

      const contatoExistente= db.contatos.some(u => u.email === email)

      if(contatoExistente){
        throw new Error(`Contato existente: ${data.nome}`)
      }

      const novoContato = {
        ...data,
        id: geradorDeId(db.contatos),
        perfil_id: 2
      };

      db.contatos.push(novoContato);

      return novoContato
    },
    atualizarContato(_, { id, data }){
      const contato = db.contatos.find(u => u.id === id)
      const indice = db.contatos.findIndex(u => u.id === id)

      const novoContato = {
        ...contato,
        ...data
      }

      db.contatos.splice(indice, 1, novoContato)
      return novoContato
    },
    deletarContato(_, { filtro: { id, email} }){
      return deletarContatoFiltro(id ? { id } : { email })
    }
  }
}

function deletarContatoFiltro(filtro){
  const chave = Object.keys(filtro)[0]
  const valor = Object.values(filtro)[0]

  const contatoEncontrado = db.contatos.find(u => u[chave] === valor)
  db.contatos = db.contatos.filter(u => u[chave] !== valor)

  return !!contatoEncontrado
}

function buscarContatoFiltro(filtro){
  const chave = Object.keys(filtro)[0]
  const valor = Object.values(filtro)[0]

  return db.contatos.find(db => db[chave] === valor) 
}