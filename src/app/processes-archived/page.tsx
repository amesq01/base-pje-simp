'use client';
import { RenderItens } from '@/components/render-itens';
import { useProcessesContext } from '@/context/processes';
//import { getData } from '../actions/get';
import { useState } from 'react';
//import { getData } from '../actions/get';



export default function ProcessesArchived() {

  const {processes} = useProcessesContext();
  // console.log('processos', processes);

  

  // getData().then((data) => {
  //   console.log(data, 'data');
   
  // }).catch((error) => {
  //   console.error(error);
  // });





  return (
    <div className="p-4">
      <p className="text-center my-10 text-black">
        {!processes ? 'carregando' : 'Processos Arquivados'}
      </p>

      <div className='flex flex-col gap-1'>
        <RenderItens processes={processes} page='archived' /> 
      </div>

    </div>
  );
}
