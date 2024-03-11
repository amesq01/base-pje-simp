// 'use server';

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import supabase from '../config/supabaseClient';
// import { cookies } from 'next/headers';
// import { useProcessesContext } from '@/context/processes';

// export const getData = async () => {
//   const {setProcesses} = useProcessesContext();


//   const client = createServerComponentClient({cookies: cookies});

//   const {data:processes, error} =  await supabase
//     .from('processes_')
//     .select('*');
//   if (error){
//     console.error('Error fetching watches');
//   }
//   console.log(processes, 'processes teimoso');
//   if(processes) setProcesses!([...processes!, processes]);
  
//   return  processes ; 
// };

