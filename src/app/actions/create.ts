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
  // receivedAt pode vir de dois contextos:
  // 1) Formulário de cadastro: "YYYY-MM-DDTHH:mm" (sem timezone) = horário local Brasília → converter para UTC.
  // 2) Protocolar/Arquivar: já vem do banco como ISO UTC (ex: "2025-02-28T17:00:00.000Z") → não reconverter.
  const raw = formData.receivedAt;
  const isFromForm = typeof raw === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(raw) && !raw.endsWith('Z') && !/\+\d{2}:\d{2}$/.test(raw);
  const received_at = isFromForm
    ? dayjs.tz(raw, 'America/Sao_Paulo').utc().toISOString()
    : (typeof raw === 'string' ? dayjs.utc(raw).toISOString() : dayjs().utc().toISOString());
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