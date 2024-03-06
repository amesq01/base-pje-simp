

import { cookies } from "next/headers";

import { FormCreate } from "./form-create";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import supabase from "../config/supabaseClient";
import React from "react";
import { set } from "react-hook-form";
import { revalidatePath } from "next/cache";
import { FormSearch } from "./form-search";

export default  async function ProcessesPending() {

  const client = createServerComponentClient({cookies: cookies})

  const {data:processes, error} = await supabase
      .from('processes_')
      .select('*')
      console.log(processes);


  if (error){
      console.error('Error fetching watches')
  }

  return (
    <div className="p-4">
      <p className="text-center  text-black my-10">Processos Pendentes de Manifestação</p>

      <div className="my-4">
        <FormSearch rawData={processes} />
      </div>

      <div className="p-4 bg-slate-400 rounded">
      <p className="text-center"> Cadastre o Processo</p>
      
  

      <FormCreate/>
      
      </div>

      

{
  processes && processes.map((process:any) => {
    return(
      <div key={process.id} className="p-4 bg-slate-400 rounded mt-5">
        <p className="text-center">Processo</p>
        <p className="text-center">Recebido em: {process.received_at}</p>
        <p className="text-center">SIMP: {process.simpnumber}</p>
        <p className="text-center">PJE: {process.pjenumber}</p>
      </div>
    )
  })
}

{
  !processes?.length && <p className="text-center text-black">Sem Processos</p>
}


    </div>
  );
}
