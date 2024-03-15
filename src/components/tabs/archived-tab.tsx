
import { TabsContent } from '@/components/ui/tabs';
import { RenderItens } from '../render-itens';

interface rawDateProps {
  processes: IProcess[]
}


export const ArchivedTab = ({processes}:rawDateProps) => {
  return (
    <TabsContent value="archived" className='bg-slate-50/70 h-screen p-0 mt-[1px] px-2'>
      <div className="">
        <p className="text-center my-10 text-black">Processos Arquivados</p>

        <div className=' flex flex-col gap-1'>
          <RenderItens processes={processes} page='archived' />  
        </div>

      </div>
    </TabsContent>
  );
};