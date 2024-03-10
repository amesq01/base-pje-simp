'use client';

import { useForm } from 'react-hook-form';
import { ButtonCreate } from './button-create';
import { createAction } from '../actions/create';
import { revalidatePath } from 'next/cache';
import dayjs from 'dayjs';

interface rawDateProps {
  process?: IProcess
  onUpdate?: () => void
}

export const FormUpdate = ({process, onUpdate}: rawDateProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      id: process?.id,
      receivedAt: dayjs(process?.received_at).format('YYYY-MM-DD'),
      simpNumber: process?.simpnumber,
      pjeNumber: process?.pjenumber
    }
  });

  const handleAction = async (data:any) => {
    await createAction(data);
    console.log(data);
    reset();
    //onUpdate();
    
  };


  return (
    <form className="flex flex-col  mt-4 gap-3" onSubmit={handleSubmit(handleAction)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="receivedAt">Recebido em:</label>
        <input 
          {...register('receivedAt')} 
          className="p-2 rounded text-black" type="date" 
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

      <ButtonCreate title='Receber' />
    </form>
  );
};

