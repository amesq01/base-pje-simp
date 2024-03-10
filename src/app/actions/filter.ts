// 'use server';

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import supabase from '../config/supabaseClient';
// import { cookies } from 'next/headers';
// import { getAction } from './get';

// export const Filter = async (formData:FormData) => {
//   const client = createServerComponentClient({cookies: cookies});

//   const processes = await getAction();
//   console.log(processes,'processos vindos da getAction');

//   const search = formData.get('searchAndFilterInput');
    
//   const result =  processes?.filter((teste:any) => {
//     return teste.pjenumber === search;});
//   console.log(result, 'resultado da busca');
//   return result;
// };