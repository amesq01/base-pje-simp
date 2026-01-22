'use server';

//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import supabase from '../config/supabaseClient';
import { revalidatePath } from 'next/cache';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const createAction: SubmitHandler<FieldValues> = async (formData) => {

  const simpnumber = formData.simpNumber;
  const pjenumber = formData.pjeNumber;
  // Interpreta a data/hora como local e converte para UTC mantendo o mesmo momento
  const received_at = dayjs(formData.receivedAt).utc().toISOString();
  const id = formData?.id;
  const type = formData?.type || 'pending';

  const {  error } = await supabase
    .from('processes_')
    .upsert(
      {
        id,
        simpnumber,
        pjenumber,
        received_at,
        type
      }
    ).eq('id', id);
  if (error) {
    console.error(error);
    return { message: 'Error', error };
  }

  // Revalidar a página e todas as rotas relacionadas
  revalidatePath('/', 'page');
  revalidatePath('/');
  
  return { message: 'Success' }; 
};