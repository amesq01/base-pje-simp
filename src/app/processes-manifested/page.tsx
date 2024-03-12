'use client';
import { RenderItens } from '@/components/render-itens';
import supabase from '../config/supabaseClient';



const getManifestedProcesses = async () => {
  const { data, error } = await supabase
    .from('processes_')
    .select('*')
    .eq('type', 'manifested');
  if (error) {
    console.log('error', error);
  }
  return data;
};

export default  async function ProcessesManifested() {

  const data:any = await getManifestedProcesses();
  
  return (
    <div className="p-4">
      <p className="text-center my-10 text-black">Processos com Manifestação</p>

      <div className=' flex flex-col gap-1'>
        <RenderItens processes={data} page='manifested' goTo='archived' />  
      </div>

    </div>
  );
}
