'use client';
import { RenderItens } from '@/components/render-itens';
import { useProcessesContext } from '@/context/processes';


export default  function ProcessesManifested() {

  const {processes} = useProcessesContext();



  return (
    <div className="p-4">
      <p className="text-center my-10 text-black">Processos com Manifestação</p>

      <div className=' flex flex-col gap-1'>
        <RenderItens processes={processes} page='manifested' goTo='archived' />   
      </div> 

    </div>
  );
}
