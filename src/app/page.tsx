import { TabsComponent } from '@/components/tabs/tabsPage';


// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import supabase from './config/supabaseClient';

// Forçar renderização dinâmica para evitar cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {

  //const client = createServerComponentClient({cookies: cookies});

  // Buscar todos os registros usando paginação para contornar o limite de 1000
  let allProcesses: any[] = [];
  let from = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: processes, error } = await supabase
      .from('processes_')
      .select('*')
      .order('received_at', { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) {
      console.error('Error fetching processes:', error);
      break;
    }

    if (processes && processes.length > 0) {
      allProcesses = [...allProcesses, ...processes];
      from += pageSize;
      hasMore = processes.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  console.log('processos', allProcesses.length);

  return (
    <div className='pb-12'>
      <TabsComponent processes={allProcesses || []}/>
    </div>
  );
}
