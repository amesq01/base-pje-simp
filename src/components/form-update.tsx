'use client';

import { useForm } from 'react-hook-form';
import { ButtonCreate } from './button-create';
import { createAction } from '../app/actions/create';
import { useRouter } from 'next/navigation';
//import { revalidatePath } from 'next/cache';
import React from 'react';
import dayjs from 'dayjs';

interface rawDateProps {
  process?: IProcess
  onUpdate: () => void
}

export const FormUpdate = ({process, onUpdate}: rawDateProps) => {
  // Função para obter data/hora local atual
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  // Sempre usar data/hora atual ao receber um processo
  const [defaultDateTime, setDefaultDateTime] = React.useState<string>(getCurrentDateTimeLocal());

  React.useEffect(() => {
    // Sempre atualizar com a hora atual quando o componente montar
    setDefaultDateTime(getCurrentDateTimeLocal());
  }, []);
    
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      id: process?.id,
      receivedAt: defaultDateTime,
      simpNumber: process?.simpnumber,
      pjeNumber: process?.pjenumber
    }
  });
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAction = async (data:any) => {
    await createAction(data);
    reset();
    onUpdate();
    router.refresh();
  };

  return (
    <form className="flex flex-col  mt-4 gap-3" onSubmit={handleSubmit(handleAction)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="receivedAt">Recebido em:</label>
        <input 
          {...register('receivedAt')} 
          className="p-2 rounded text-black" 
          type="datetime-local"
          key={defaultDateTime}
          defaultValue={defaultDateTime}
        />
      </div>

      <div className="flex flex-col gap-1  ">
        <label htmlFor="simpNumber">SIMP:</label>
        <input placeholder="simp" className="p-2 rounded text-black" type="text" {...register('simpNumber')}  />
      </div>

      <div className="flex flex-col gap-1 ">
        <label htmlFor="PJE">PJE:</label>
        <input  placeholder="pje" className="p-2 rounded text-black" type="text" {...register('pjeNumber')} />
      </div>

      <div className="flex justify-between items-center gap-2">
        <ButtonCreate title='Receber' />
        <button 
          className='border border-black p-2 rounded'
          onClick={onUpdate}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

