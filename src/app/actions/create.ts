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
  const received_at = dayjs(formData.receivedAt).utc();
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
  }
  
  revalidatePath('/');
  return { message: 'Success' }; 
};