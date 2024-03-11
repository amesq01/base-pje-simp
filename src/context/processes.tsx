'use client';

import supabase from '@/app/config/supabaseClient';

import { createContext, useContext, useEffect, useState } from 'react';

interface ProcessesContextProviderProps  {
  children: React.ReactNode;
}

interface ProcessContext {
  processes: IProcess[] | [];
  //setProcesses?: React.Dispatch<React.SetStateAction<IProcess[] | []>>;
  //subscription: boolean;
}

export const ProcessesContext = createContext<ProcessContext | undefined>(undefined);

export const ProcessesProvider = ({ children }: ProcessesContextProviderProps) => {
  const [processes, setProcesses] = useState<IProcess[] | []>([]);
  
  const [subscription, setSubscription] = useState<boolean>(false);


  // const [chanel, SetChanel] = useState<any>();

  function subscribeToProcess() {
    const chanel = supabase
      .channel('processes_')
      .on('postgres_changes',
        {
          event:'INSERT',
          schema:'public',
          table:'processes_'
        },(payload) => {
          console.log('Change received!', payload);
          if(payload){
            setSubscription(true);
          }
          setTimeout(() => {
            setSubscription(false);
          }, 2000);
        }
      ).subscribe();          
  }

  useEffect(() => {
    const getProcesses = async () => {
      const {data, error} = await supabase
        .from('processes_')
        .select('*');
      if (error) {
        throw error;
      }
      setProcesses(data) ;
  
    };
    getProcesses();
  }, [subscription]);

  
 
  return (
    <ProcessesContext.Provider value={{processes}}>
      {children}
    </ProcessesContext.Provider>
  );
};


export const useProcessesContext = () => {
  const context = useContext(ProcessesContext);
  if (!context) {
    throw new Error('useProcessesContext must be used within a ProcessesProvider');
  }
  return context;
};