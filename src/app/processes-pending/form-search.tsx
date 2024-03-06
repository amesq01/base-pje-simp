'use client'

import { useForm } from "react-hook-form";
import { ButtonSearch } from "./button-search";
import { createAction } from "../actions/create";
import { useState } from "react";
import { Adamina } from "next/font/google";


export const FormSearch = (props:any) => {

  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {rawData} = props

  


  
   const handleAction = (data:any) => {
 
    const result = rawData.filter((process:any) => {
      return process.simpnumber === data.search
    })
    console.log(result)
    reset()

  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleAction)}>
      <div className="mt-5 p-2 flex gap-2 items-center justify-between">
        <input  type="text" placeholder="Buscar processo" className="p-3 w-full rounded text-black" {...register('search')} />
    
      <ButtonSearch />
      </div>

    </form>
  )
}

