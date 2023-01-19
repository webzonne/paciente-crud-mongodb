import conectarDB from '../lib/dbConnect'
import React from 'react'
import modelPaciente from '../models/modelo'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImPlus } from 'react-icons/im';

// SERVER
export async function getServerSideProps() {
  try {
    await conectarDB()

    const res = await modelPaciente.find({})
    const pacientes = res.map((element) => {
      const paciente = element.toObject()
      paciente._id = paciente._id.toString()
      return paciente
    })
   
    // retorna
    return { props: { pacientes } }
  } catch (err) {
    console.log(err)
  }
}
// CLOSE SERVER



// EDITAR
const editar = async(e)=>{

}

// ELIMINAR
const eliminar = async(e)=>{
  confirm('desea eliminar? '+e.nombre)
  await fetch(`api/eliminar/${e._id}`, {
    method:'DELETE'
  })
  window.location.reload()
 }

export default function app({ pacientes }){

  // VARIABLES
  const {push,query} = useRouter()

  //VER
const detalle = async(e)=>{
  push(`/detalle/${e._id}`)
}
// EDITAR
const editar = async(e)=>{
  push(`/editar/${e._id}`)
}
// CONSOLE

    return(
      <>
      <Layout>
        <h1 className='text-xl  text-center py-2 mt-20 mb-10 m-auto w-2/12 border border-slate-100 rounded'>LISTA DE PACIENTES</h1>
        {pacientes.length ?
          <div>
            <div className='flex mx-auto justify-end w-10/12'>
              <button onClick={()=>push("/formulario")} className='flex items-center py-3 px-8 mb-5 bg-botoncolor rounded font-bold text-slate-50 hover:opacity-60'><span className='mr-2'>PACIENTE</span> <ImPlus /></button>
            </div>
            <table className="table-auto w-10/12 mx-auto border border-black-200">
              <thead>
                <tr>
                  <th className='border border-black-200 p-3'>Nombre</th>
                  <th className='border border-black-200 p-3'>Patologia</th>
                  <th className='border border-black-200 p-3'>Ver</th>
                  <th className='border border-black-200 p-3'>Editar</th>
                  <th className='border border-black-200 p-3'>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td className='text-center border border-black-200'>{e.nombre}</td>
                      <td className='text-center border border-black-200'>{e.patologia}</td>
                      <td className='text-center border border-black-200'><button onClick={()=>detalle(e)} className='bg-green-700 p-2 w-full h-full text-slate-50'>Detalle</button></td>
                      <td className='text-center border border-black-200'><button onClick={()=>editar(e)} className='bg-cyan-800 p-2 w-full h-full text-slate-50'>Editar</button></td>
                      <td className='text-center border border-black-200'><button onClick={()=>eliminar(e)} className='bg-rose-900 p-2 w-full h-full text-slate-50'>Eliminar</button></td>
                    </tr>
                  )
                })}
  
              </tbody>
            </table>
  
          </div>
          : <p className='w-8/12 mx-auto text-4xl text-center'>No hay pacientes por ahora..</p>}
      </Layout>
    </>
    )
} 
 
 
