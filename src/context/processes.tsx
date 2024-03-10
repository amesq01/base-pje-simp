import supabase from '@/app/config/supabaseClient';
import { createContext, useContext } from 'react';


interface RawData  {
  processes:IProcess
}

const Contexto = createContext({
  processes: []

});

const AllProcesses = async ({children}:{children:React.ReactNode}) => {
  
  const {data:processes, error} =  await supabase
    .from('processes_')
    .select('*')
    .order('received_at', {ascending: true});
 
  return (
    <Contexto.Provider value={{processes: []}}>
      {children}
    </Contexto.Provider>
  );
};

//export useContext
export const useProcesses = () => {
  return useContext(Contexto);
};


const {processes} = useProcesses();

console.log(useProcesses);