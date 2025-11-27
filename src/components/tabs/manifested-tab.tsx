
import { TabsContent } from '@/components/ui/tabs';
import { RenderItens } from '../render-itens';

interface rawDateProps {
  processes: IProcess[]
}


export const ManifestedTab = ({processes}:rawDateProps) => {
  return (
    <TabsContent value="manifested" className='bg-slate-50/70 h-screen p-0 mt-[1px] px-2'>
      <div className="">
        <p className="text-center my-10 text-black">Processos com Manifestação!</p>

        <div className=' flex flex-col gap-1'>
          <RenderItens processes={processes} page='manifested' goTo='archived' />  
        </div>

      </div>
    </TabsContent>
  );
};