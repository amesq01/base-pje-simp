

export default function ProcessesPending() {
  return (
    <div className="p-4">
      <p className="text-center my-10">Processos Pendentes de Manifestação</p>

      <div className="p-4 bg-slate-400 rounded">
      <p className="text-center"> Cadastre o Processo</p>
      
      <form className="flex flex-col  mt-4 gap-3" action="">     
       <div className="flex flex-col gap-1">
        <label htmlFor="receivedAt">Recebido em:</label>
          <input className="p-2 rounded" type="date" id="receivedAt" name="receivedAt" />
       </div>

        <div className="flex flex-col gap-1  ">
          <label htmlFor="simpNumber">SIMP:</label>
          <input className="p-2 rounded" type="text" id="simpNumber" name="simpNumber" />
        </div>

       <div className="flex flex-col gap-1 ">
        <label htmlFor="PJE">PJE:</label>
        <input className="p-2 rounded" type="text" id="PJE" name="PJE" />
       </div>

       <button className="flex bg-bgPrimary rounded p-2 hover:bg-bgPrimary/80 justify-center">
          <p>Cadastrar</p>
       </button>
        </form>
      </div>

      <div className="mt-5 p-2 flex gap-3 items-center justify-between">
        <input  type="text" placeholder="Buscar processo" className="p-3 w-full rounded" />
        <p>Buscar</p>
      </div>

    </div>
  );
}
