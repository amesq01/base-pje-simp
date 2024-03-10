interface ButtonCreateProps {
  title:string
}


export const ButtonCreate =  ({title}:ButtonCreateProps) => {
  return(
    <button type="submit" className="flex bg-blue-500 rounded p-2 hover:bg-bgPrimary/80 justify-center">
      <p>{title}</p>
    </button>
  );
};