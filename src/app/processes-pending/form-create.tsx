'use client'

import { useForm } from "react-hook-form";
import { ButtonCreate } from "./button-create";
import { createAction } from "../actions/create";





export const FormCreate = (props:any) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleAction = async (data:any) => {
    await createAction(data)
    console.log(data)
    reset()
    
  }

  return (
    <form className="flex flex-col  mt-4 gap-3" onSubmit={handleSubmit(handleAction)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="receivedAt">Recebido em:</label>
        <input className="p-2 rounded text-black" type="date" {...register('receivedAt')} />
      </div>

      <div className="flex flex-col gap-1  ">
        <label htmlFor="simpNumber">SIMP:</label>
        <input placeholder="simp" className="p-2 rounded text-black" type="text" {...register('simpNumber')}  />
      </div>

      <div className="flex flex-col gap-1 ">
        <label htmlFor="PJE">PJE:</label>
        <input placeholder="pje" className="p-2 rounded text-black" type="text" {...register('pjeNumber')} />
      </div>

      <ButtonCreate />
    </form>
  )
}

