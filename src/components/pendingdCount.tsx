import { useProcessesContext } from '@/context/processes';

const PendingCount =  () => {

  // const {processes} = useProcessesContext();
  // const countProcessesPendentes = processes.filter((process) => process.type === 'pending').length;
  
  return(
    <>
      <p>PENDENTES</p>
    </>
  );
};

export default PendingCount;