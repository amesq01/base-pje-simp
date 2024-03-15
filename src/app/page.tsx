import { TabsComponent } from '@/components/tabs/tabsPage';


// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import supabase from './config/supabaseClient';

export default async function Home() {

  //const client = createServerComponentClient({cookies: cookies});

  const {data:processes, error} =  await supabase
    .from('processes_')
    .select('*')
    .order('received_at', {ascending: true});
     
  if (error){
    console.error('Error fetching watches');
  }

  console.log( 'processos', processes);

  return (
    <div className='pb-12'>
      <TabsComponent processes={processes || []}/>
    </div>
  );
}
