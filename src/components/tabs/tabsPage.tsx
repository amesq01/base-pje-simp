'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PendingTab } from './pending-tab';
import { ManifestedTab } from './manifested-tab';
import { ArchivedTab } from './archived-tab';

interface rawDateProps {
  processes: IProcess[]

}

export const TabsComponent = ({processes}:rawDateProps) => {

  const lengthPendingProcesses = processes.filter((process) => process.type === 'pending').length;

  const lenthManifestedProcesses = processes.filter((process) => process.type === 'manifested').length;

  const lengthArchivedProcesses = processes.filter((process) => process.type === 'archived').length;


  return(
    <Tabs defaultValue="pending" className=" flex flex-col w-full max-w-[500px] m-auto  p-0 bg-slate-100">
      <TabsList className="w-full p-0 bg-transparent rounded-none flex gap-[1px]" >
        <TabsTrigger
          className='flex  flex-1 justify-center items-center' 
          value="pending">
            Pendentes ({lengthPendingProcesses})
        </TabsTrigger>
        
        <TabsTrigger 
          className='flex flex-1 justify-center items-center'
          value="manifested">
          Manifestados ({lenthManifestedProcesses})
        </TabsTrigger>

        <TabsTrigger
          className='flex flex-1 justify-center items-center' 
          value="archived">
          Arquivados ({lengthArchivedProcesses})
        </TabsTrigger>

      </TabsList>

      <PendingTab processes ={processes}/>
      <ManifestedTab processes={processes}/>
      <ArchivedTab processes={processes}/>
      
    </Tabs>
  );


};
