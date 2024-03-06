'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import supabase from "../config/supabaseClient"
import { revalidatePath } from "next/cache"

export const createAction = async (formData:any) => {
    let simpnumber = formData.simpNumber
    let pjenumber = formData.pjeNumber
    let received_at = formData.receivedAt

  const { data, error } = await supabase
      .from('processes_')
      .insert([
          {
            simpnumber,
            pjenumber,
            received_at,
            type: 'pendente'
          }
      ])
  if (error) {
     const {data, error} = await supabase
     .from('processes_')
     .update([
        {
          
          received_at,
        }
     ]).match({pjenumber: pjenumber}).eq('type', 'manifested')

     alert('Processo já cadastrado')
    
      revalidatePath('/processes-pending')
  }
   revalidatePath('/processes-pending')
  console.log(data)

  return { message: 'Success' } 
}