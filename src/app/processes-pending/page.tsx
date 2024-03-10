'use client';
//import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormCreate } from './form-create';
//import { ButtonSearch } from './button-search';
import { RenderItens } from '@/components/render-itens';
//import { Filter } from '../actions/filter';
import { FormEvent, useState } from 'react';
import { FormUpdate } from './form-update';

interface rawDateProps {
  rawData: IProcess[]
}

export default function ProcessesPending({rawData}:rawDateProps) {

  const [isProcessCreated, setIsProcessCreated] = useState<'initial'|'not-found'| 'found'>();
  const [searchedValue, setSearchedValue] = useState<IProcess>();
  

  async function searchAndFilter (e:FormEvent<HTMLFormElement>
  )  {
    e.preventDefault();
    
    const {searchAndFilterInput} = Object.fromEntries(new FormData(e.currentTarget));
        
    const findProcess = rawData
      .find((process) => process.pjenumber === searchAndFilterInput);
    setIsProcessCreated(findProcess ? 'found' : 'not-found');
    setSearchedValue(findProcess);
    
    e.currentTarget.reset();
  }
  return (
    <div className="p-4">
      <p 
        className="text-center  text-black my-10">
        Processos Pendentes de Manifestação
      </p>
      <div className="my-4">
        <form onSubmit={searchAndFilter} className='flex gap-2'>
          <input 
            required
            type="text" 
            name="searchAndFilterInput" 
            placeholder="Buscar processo" 
            className="p-3 w-full rounded text-black" 
          />
          <button type="submit" className="flex bg-blue-500 rounded p-2 hover:bg-bgPrimary/80 justify-center">
            <p>Buscar</p>
          </button>
        </form>
      </div>

      {
        isProcessCreated==='not-found' && <div className="p-4 bg-slate-400 rounded">
          <p className="text-center">Cadastre o Processo</p>
          <FormCreate process={searchedValue} onUpdate={()=>{
            setIsProcessCreated('initial');
          }} />
          
        </div>
      }

      {
        isProcessCreated==='found' && <div className="p-4 bg-green-400 rounded">
          <p className="text-center">Receber processo</p>
          <FormUpdate process={searchedValue} onUpdate={()=>{
            setIsProcessCreated('initial');
          }} />
        </div>
      }
 
      <div className="flex flex-col gap-2 mt-4
      ">
        <RenderItens processes={rawData}/>
      </div>
    </div>
  );
}
