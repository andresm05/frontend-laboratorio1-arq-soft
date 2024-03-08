import { NavButton } from "@/components/NavButton";
import ThemeSwitch from "@/components/ThemeSwitch";

const page = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/3 mx-auto">
            <div className="h-full bg-gray-100 dark:bg-gray-900 bg-opacity-75 px-8 pt-8 pb-16 rounded-lg overflow-hidden text-center relative">
              <div className="flex p-4 justify-end">
                <ThemeSwitch />
              </div>
              <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                Selecciona el filtro
              </h1>
              <div className="flex flex-col space-y-2 w-4/6 mx-auto">
                <NavButton title="Buscar por fecha" path="/search/date" />
                <NavButton title="Buscar Aerolinea" path="/search/airline" />
                <NavButton title="Buscar por precio" path="/search/price" />
                <NavButton title="Buscar por ruta" path="/search/route" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
