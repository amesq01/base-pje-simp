

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import ProcessesPending from './processes-pending/page';
import { cookies } from 'next/headers';
import supabase from './config/supabaseClient';



export default async function Home() {

  const client = createServerComponentClient({cookies: cookies});

  const {data:processes, error} =  await supabase
    .from('processes_')
    .select('*')
    .order('received_at', {ascending: true});
     
  if (error){
    console.error('Error fetching watches');
  }
  return (
    <>
      <ProcessesPending rawData={processes || []}/>
    </>
  );
}
