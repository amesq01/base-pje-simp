
'use client';

import { createAction } from '@/app/actions/create';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

dayjs.extend(utc);


interface rawDateProps {
  processes: IProcess[] 
  page: 'pending' | 'manifested' | 'archived'
  goTo?: string
}

export function RenderItens({processes, page, goTo}:rawDateProps){
  let filteredProcesses = processes?.filter((process) => { return process.type === page;});
  
  // Ordenar arquivados por data de arquivamento (mais recentes primeiro)
  if (page === 'archived') {
    filteredProcesses = filteredProcesses?.sort((a, b) => {
      const dateA = a.archived_at ? new Date(a.archived_at).getTime() : 0;
      const dateB = b.archived_at ? new Date(b.archived_at).getTime() : 0;
      return dateB - dateA; // Ordem decrescente (mais recente primeiro)
    });
  }

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

  const {toast } = useToast();
  const router = useRouter();

  function clipBoard(item: string){
    navigator.clipboard.writeText(item);
    toast({variant: 'destructive',
      title: 'Copiado',
      description: 'Número copiado para a área de transferência',
      type: 'foreground',
    });
  }
  
  // Função para formatar data - converter de UTC para timezone local (UTC-3)
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    
    // A data vem do servidor em UTC (formato ISO com 'Z' no final)
    // new Date() interpreta strings ISO com 'Z' como UTC e converte automaticamente
    // para o timezone local do navegador (que é UTC-3 no seu caso)
    const date = new Date(dateString);
    return format(date, 'P \'às\' p', {locale:ptBR});
  };
  
  // Determinar quais campos mostrar baseado na página e processo
  const getFieldsToShow = (process: IProcess) => {
    if (page === 'archived') {
      return {
        labels: ['Arquivado em:', 'Manifestado em:', 'Recebido em:', 'SIMP:', 'PJE:'],
        values: [
          formatDate(process.archived_at),
          formatDate(process.manifested_at),
          formatDate(process.received_at),
          formatarSIMP(process.simpnumber),
          formatarPJE(process.pjenumber)
        ]
      };
    } else if (page === 'manifested') {
      return {
        labels: ['Manifestado em:', 'Recebido em:', 'SIMP:', 'PJE:'],
        values: [
          formatDate(process.manifested_at),
          formatDate(process.received_at),
          formatarSIMP(process.simpnumber),
          formatarPJE(process.pjenumber)
        ]
      };
    } else {
      return {
        labels: ['Recebido em:', 'SIMP:', 'PJE:'],
        values: [
          formatDate(process.received_at),
          formatarSIMP(process.simpnumber),
          formatarPJE(process.pjenumber)
        ]
      };
    }
  };
  
  return(
    <>
      {
        filteredProcesses && filteredProcesses.map((process:IProcess) => {
          const fields = getFieldsToShow(process);
          return(
            <div key={process.id} className="p-1 px-2 bg-slate-300 rounded text-xs flex justify-between items-center gap-2"> 
              <div className='flex flex-col w-fit text-end text-slate-900 gap-1'>
                {fields.labels.map((label, index) => (
                  <p key={index}>{label}</p>
                ))}
              </div>
              <div className='flex flex-col flex-1 text-start text-xs gap-1 text-slate-700'>
                {fields.values.map((value, index) => (
                  index === fields.values.length - 1 ? (
                    <p key={index} className="cursor-pointer" onClick={()=>clipBoard(process.pjenumber)}>{value}</p>
                  ) : (
                    <p key={index}>{value}</p>
                  )
                ))}
              </div>

            
              {
                page !== 'archived' && 

              <button 
                className=" bg-green-600 px-1 h-9  rounded text-white text-[10px]"
                onClick={async () => {
                  await createAction({
                    id: process.id,
                    pjeNumber: process.pjenumber,
                    simpNumber: process.simpnumber,
                    receivedAt: process.received_at,
                    type: goTo || 'pending'
                  });
                  router.refresh();
                }}
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
