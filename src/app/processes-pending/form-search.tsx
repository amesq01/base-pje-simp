'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ButtonSearch } from './button-search';

interface FormSearchProps {
  rawData: IProcess[]
}

export const FormSearch = ({rawData}:FormSearchProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const handleAction:SubmitHandler<FieldValues> = (data) => {
    const result = rawData.filter((process:IProcess) => {
      return process.simpnumber === data.search;
    });
    console.log(result);
    reset();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleAction)}>
      <div className="mt-5 p-2 flex gap-2 items-center justify-between">
        <input  
          type="text" 
          placeholder="Buscar processo" 
          className="p-3 w-full rounded text-black" {...register('search')} 
        />
        <ButtonSearch />
      </div>
    </form>
  );
};

