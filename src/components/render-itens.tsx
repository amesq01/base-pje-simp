
import { createAction } from '@/app/actions/create';
import dayjs from 'dayjs';

interface rawDateProps {
  processes?: IProcess[]
}

export function RenderItens({processes}:rawDateProps){
  const filteredProcesses = processes?.filter((process) => { return process.type === 'pendente';});

  return(
    <>
      {
        filteredProcesses && filteredProcesses.map((process:IProcess) => {
          return(
            <div key={process.id} className="py-2 px-3 bg-slate-400 rounded text-sm flex justify-between items-center"> 
              <div className='flex flex-col'>
                <p className="">Recebido em: {dayjs(process?.received_at).format('DD/MM/YYYY')}</p>
                <p className="">SIMP: {process.simpnumber}</p>
                <p className="">PJE: {process.pjenumber}</p>
              </div>

              <button 
                className=" bg-green-400 px-2 h-9  rounded text-black text-xs"
                onClick={async () => createAction({...process, type:'protocolado'})}
              >
                Protocolar
              </button>
              
            </div>
           
          );
        })
      }

      {
        !processes?.length && <p className="text-center text-black">Sem Processos</p>
      } 
    </>
  );
}
