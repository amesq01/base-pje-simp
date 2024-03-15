

import { createAction } from '@/app/actions/create';
import dayjs from 'dayjs';

interface rawDateProps {
  processes: IProcess[] 
  page: 'pending' | 'manifested' | 'archived'
  goTo?: string
}

export function RenderItens({processes, page, goTo}:rawDateProps){
  const filteredProcesses = processes?.filter((process) => { return process.type === page;});

  function formatarSIMP(numero: string) {
    const apenasDigitos = numero.replace(/\D/g, '');
    const numeroFormatado = apenasDigitos.replace(/(\d{6})(\d{3})(\d{4})/, '$1-$2/$3');
    return numeroFormatado;
  }

  function formatarPJE(numero: string) {
    const apenasDigitos = numero.replace(/\D/g, '');
    const numeroFormatado = apenasDigitos.replace(/(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/, '$1-$2.$3.$4.$5.$6');
    return numeroFormatado;
  }

  return(
    <>
      {
        filteredProcesses && filteredProcesses.map((process:IProcess) => {
          return(
            <div key={process.id} className="p-1 px-2 bg-slate-300 rounded text-xs flex justify-between items-center gap-2"> 
              <div className='flex flex-col w-fit text-end text-slate-900 gap-1'>
                <p>Recebido em:</p>
                <p>SIMP:</p>
                <p>PJE:</p>
              </div>
              <div className='flex flex-col flex-1 text-start text-xs gap-1 text-slate-700'>
                <p className="">{dayjs(process?.received_at).format('DD/MM/YYYY')}</p>
                <p className=""> {formatarSIMP(process.simpnumber)}</p>
                <p className=""> {formatarPJE(process.pjenumber)}</p>
              </div>

            
              {
                page !== 'archived' && 

              <button 
                className=" bg-green-600 px-1 h-9  rounded text-white text-[10px]"
                onClick={async () => createAction({...process, type:goTo})}
              >
                {page === 'pending' ? 'Protocolar' : 'Arquivar'}
              </button>
              }
              
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
