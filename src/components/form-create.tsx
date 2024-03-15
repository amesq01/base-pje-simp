'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ButtonCreate } from './button-create';
import { createAction } from '../app/actions/create';
//import { revalidatePath } from 'next/cache';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

interface rawDateProps {
  process?: IProcess
  onUpdate: () => void
  inputValue?: string
}
export const FormCreate = ({onUpdate, process, inputValue}:rawDateProps) => {

  //const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      receivedAt: dayjs(new Date).format('YYYY-MM-DD'),
      simpNumber: '',
      pjeNumber: inputValue
    }
  });

  const handleAction:SubmitHandler<FieldValues> = async (data) => {
    await createAction(data);
    reset();
    onUpdate();
    
    
  };

  return (
    <form className="flex flex-col  mt-4 gap-3" onSubmit={handleSubmit(handleAction)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="receivedAt">Recebido em:</label>
        <input required className="p-2 rounded text-black" type="date" {...register('receivedAt')} />
      </div>

      <div className="flex flex-col gap-1  ">
        <label htmlFor="simpNumber">SIMP:</label>
        <input required placeholder="simp" className="p-2 rounded text-black" type="text" {...register('simpNumber')}  />
      </div>

      <div className="flex flex-col gap-1 ">
        <label htmlFor="PJE">PJE:</label>
        <input required placeholder="pje" className="p-2 rounded text-black" type="text" {...register('pjeNumber')} />
      </div>

      <div className="flex justify-between items-center gap-2">
        <ButtonCreate title='Cadastrar' />
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

