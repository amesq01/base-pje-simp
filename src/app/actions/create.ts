'use server';

//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import supabase from '../config/supabaseClient';
import { revalidatePath } from 'next/cache';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const createAction: SubmitHandler<FieldValues> = async (formData) => {

  const simpnumber = formData.simpNumber;
  const pjenumber = formData.pjeNumber;
  // O input datetime-local retorna "YYYY-MM-DDTHH:mm" sem timezone (hora local)
  // Precisamos adicionar 3 horas para converter de UTC-3 (horário local) para UTC
  // Criar um objeto Date local e adicionar 3 horas antes de converter para UTC
  const localDate = new Date(formData.receivedAt);
  // Adicionar 3 horas (3 * 60 * 60 * 1000 milissegundos) para converter de UTC-3 para UTC
  const utcDate = new Date(localDate.getTime() + (3 * 60 * 60 * 1000));
  const received_at = dayjs(utcDate).utc().toISOString();
  const id = formData?.id;
  const type = formData?.type || 'pending';
  
  // Preparar objeto de atualização
  const updateData: any = {
    id,
    simpnumber,
    pjenumber,
    received_at,
    type
  };
  
  // Se está mudando para 'manifested', salvar a data de manifestação
  if (type === 'manifested') {
    updateData.manifested_at = dayjs().utc().toISOString();
  }
  
  // Se está mudando para 'archived', salvar a data de arquivamento
  if (type === 'archived') {
    updateData.archived_at = dayjs().utc().toISOString();
  }

  const {  error } = await supabase
    .from('processes_')
    .upsert(updateData)
    .eq('id', id);
  if (error) {
    console.error(error);
    return { message: 'Error', error };
  }

  // Revalidar a página e todas as rotas relacionadas
  revalidatePath('/', 'page');
  revalidatePath('/');
  
  return { message: 'Success' }; 
};