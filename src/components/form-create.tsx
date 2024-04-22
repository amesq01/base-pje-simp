'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ButtonCreate } from './button-create';
import { createAction } from '../app/actions/create';
//import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';
import dayjs from 'dayjs';
import { ptBR } from 'date-fns/locale/pt-BR';

interface rawDateProps {
  process?: IProcess
  onUpdate: () => void
  inputValue?: string
}
export const FormCreate = ({onUpdate, process, inputValue}:rawDateProps) => {

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  console.log('date', date);

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
      {/* <div className="flex flex-col gap-1">
        <label htmlFor="receivedAt">Recebido em:</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ?  format(date, 'P', {locale:ptBR}) : <span>Selecione uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              {...register('receivedAt', { required: true })}
            />
          </PopoverContent>
        </Popover>
      </div> */}
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

