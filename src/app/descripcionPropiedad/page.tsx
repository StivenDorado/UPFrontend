import Encabezado from "../components/Apprentice/landing-publi/Encabezado";
import GaleriaImagenes from "../components/Apprentice/landing-publi/GaleriaImagenes";
import Servicios from "../components/Apprentice/landing-publi/Servicios";
import Resenas from "../components/Apprentice/landing-publi/Resenas";
import InformacionArrendador from "../components/Apprentice/landing-publi/InformacionArrendador";
import PrecioReserva from "../components/Apprentice/landing-publi/PrecioReserva";
import Footer from "../components/general/footer/Footer";
import Header from "../components/general/header/Headerlg";

export default function PaginaPropiedad() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <Encabezado /> */}

      <main className="flex-1 container mx-auto p-4">
        <div className="my-4">
          <h2 className="text-sm font-medium">A 500 metros de distancia</h2>
        </div>

        <GaleriaImagenes />
        <Servicios />
        <Resenas />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 order-2 md:order-1">
            <PrecioReserva />
          </div>

          <div className="md:col-span-2 order-1 md:order-2">
            <InformacionArrendador />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}