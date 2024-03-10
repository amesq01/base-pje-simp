// 'use server';

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import supabase from '../config/supabaseClient';
// import { cookies } from 'next/headers';

// export const getAction = async () => {
//   const client = createServerComponentClient({cookies: cookies});

//   const {data:processes, error} =  await supabase
//     .from('processes_')
//     .select('*');
//   console.log(processes);
     
//   if (error){
//     console.error('Error fetching watches');
//   }

//   return  processes ; 
// };