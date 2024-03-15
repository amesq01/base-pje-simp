interface ButtonCreateProps {
  title:string
}


export const ButtonCreate =  ({title}:ButtonCreateProps) => {
  return(
    <button type="submit" className="flex w-full border border-blue-500 bg-blue-500 rounded p-2 hover:bg-bgPrimary/80 justify-center">
      <p>{title}</p>
    </button>
  );
};