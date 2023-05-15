import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const CompFormulario = () => {
  //estado - hooks
  const [nombre,setNombre] = React.useState("");
  const [apellido,setApellido] = React.useState("")
  const [lista, setLista] = React.useState([])
  const [editarId, setEditarId] = React.useState(null);
  const [nuevoNombre, setNuevoNombre] = React.useState("");
  const [nuevoApellido, setNuevoApellido] = React.useState("");

  //guardar datos 
  const guardarDatos = (e)=>{
    e.preventDefault();
    if(!nombre){
      alert("Falta el nombre")
      return
    }
    if(!apellido){
      alert("Falta el Apellido")
      return
    }
    //Agregar a la lista
    setLista([
      ...lista,
      { id: uuidv4(), nombre: nombre, apellido: apellido }
    ])
    //limpiar inputs
    e.target.reset();
    //limpiar los estados
    setApellido("")
    setNombre("")
  }

  const eliminarFila = (id) => {
  const nuevaLista = lista.filter((item) => item.id !== id);
  setLista(nuevaLista);
  };

  const editarFila = (id) => {
  const filaEditar = lista.find((item) => item.id === id);
  setEditarId(id);
  setNuevoNombre(filaEditar.nombre);
  setNuevoApellido(filaEditar.apellido);
  };

    const actualizarFila = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoApellido) {
      alert("Faltan campos de edición");
      return;
    }
  const nuevaLista = lista.map((item) => {
    if (item.id === editarId) {
        return {
          ...item,
          nombre: nuevoNombre,
          apellido: nuevoApellido
        };
      }
      return item;
    });
    setLista(nuevaLista);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setEditarId(null);
    setNuevoNombre("");
    setNuevoApellido("");
  };



 return (
    <div className='container col-xs-8 col-sm-8 col-md-6mdgit init col-xl-4 col-10 m-auto mt-5 rounded-4 border border-info p-5'>
        <h2 className="text-primary text-center mb-3 ">Formulario de Registro de Usuario</h2>
        <form onSubmit={guardarDatos}>
          <input type="text" className='form-control mb-3' placeholder='ingrese su Nombre' onChange={(e)=>setNombre(e.target.value.trim())} />
          <input type="text" className='form-control mb-3' placeholder='ingrese su Apellido' onChange={(e)=>setApellido(e.target.value.trim())}/>
          <div className='d-grid gap-2'>
          <button type="submit" className='btn btn-outline-info'>Registrar</button>
        </div>
        </form>
        <hr />
        <ol className='list-group'>
          {lista.map((item) => (<li className='list-group-item' key={item.id}>
            {item.id === editarId ? (<form onSubmit={actualizarFila}>
              <input type='text'className='form-control mb-3'placeholder='Ingrese su Nombre'value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value.trim())}/>
          <input type='text' className='form-control mb-3' placeholder='Ingrese su Apellido'value={nuevoApellido} onChange={(e) => setNuevoApellido(e.target.value.trim())}/>
          <div className='d-grid gap-2'>   
            <button type='submit' className='btn btn-outline-info'>Guardar</button>
            <button type='button' className='btn btn-outline-danger' onClick={cancelarEdicion}>Cancelar</button>
          </div>
        </form>
      ) : (
        <div>
          {item.nombre} {item.apellido}
          <button
            className='btn btn-danger float-end'
            onClick={() => eliminarFila(item.id)}
          >
            Eliminar
          </button>
          <button
            className='btn btn-primary float-end me-2'
            onClick={() => editarFila(item.id)}
          >
            Editar
          </button>
        </div>
      )}
    </li>
  ))}
</ol>



        
    </div>
  )
}

export default CompFormulario