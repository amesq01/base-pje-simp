
import { TabsContent } from '@/components/ui/tabs';
import { FormEvent, useState } from 'react';

import { FormUpdate } from '../form-update';
import { RenderItens } from '../render-itens';
import { FormCreate } from '../form-create';


interface rawDateProps {
  processes: IProcess[]
}



export const PendingTab = ({processes}:rawDateProps) => {

  const [isProcessCreated, setIsProcessCreated] = useState<'initial'|'not-found'| 'found'>();
  const [searchedValue, setSearchedValue] = useState<IProcess>();
  const [inputValue, setInputValue] = useState<string>('');

  function searchAndFilter (e:FormEvent<HTMLFormElement>
  )  {
    e.preventDefault();

    const {searchAndFilterInput} = Object.fromEntries(new FormData(e.currentTarget));

    const findProcess = processes
      .find((process) => process.pjenumber === searchAndFilterInput);
    if(findProcess?.type==='pending'){
      alert('Processo já cadastrado e encontra-se na lista de pendentes');
      return;
    }
    else if(findProcess?.type==='manifested'){
      alert('Processo já cadastrado e encontra-se na lista de manifestados');
      return;
    }
    setIsProcessCreated(findProcess ? 'found' : 'not-found');
    if(!findProcess){
      setInputValue(searchAndFilterInput.toString());
    }
    setSearchedValue(findProcess);
    e.currentTarget.reset();
  }


  return (
    <TabsContent value="pending" className='bg-slate-50/70  p-0 mt-[1px] px-2 mb-2'>
      <div className='flex justify-center items-center py-10'>
        <p>Processos Pendentes de Manifestação </p>
      </div>

      <div className="my-4">
        <form onSubmit={searchAndFilter} className='flex gap-2'>
          <input 
            required
            type="text" 
            name="searchAndFilterInput" 
            placeholder="Buscar processo" 
            className="p-3 w-full rounded text-black border" 
          />
          <button type="submit" className="flex bg-blue-500 rounded px-4 hover:bg-bgPrimary/80 justify-center items-center">
            <p className='text-md text-white'>Buscar</p>
          </button>
        </form>
      </div>

      {
        isProcessCreated==='not-found' && <div className="p-4 bg-slate-400 rounded">
          <p className="text-center">Cadastre o Processo</p>
          <FormCreate 
            inputValue={inputValue}
            process={searchedValue}
            onUpdate={()=>{
              setIsProcessCreated('initial');
              
            }}
          />
          
        </div>
      }

      {
        isProcessCreated==='found' && <div className="p-4 bg-green-400 rounded">
          <p className="text-center">Receber processo</p>
          <FormUpdate 
            process={searchedValue} 
            onUpdate={()=>{
              setIsProcessCreated('initial');
            }} />
        </div>
      }
 
      <div className="flex flex-col gap-2 mt-4
      ">
        <RenderItens processes={processes} page='pending' goTo='manifested'/>
      </div>

      
    </TabsContent>
  );
};