import { CheckCircle, ExternalLink, Edit, Share2, Calendar, Star } from "lucide-react"
import { Button } from "../components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "../components/ui/card"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Barra de navegación simple */}

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-3">¡Tu publicación ha sido registrada con éxito!</h1>
            <p className="text-gray-600 text-lg mb-8">
              Tu espacio ya está disponible para que los huéspedes lo descubran.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="gap-2">
                <ExternalLink size={18} />
                Ver publicación
              </Button>
              <Button variant="outline" className="gap-2">
                <Edit size={18} />
                Editar publicación
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 size={18} />
                Compartir
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden border shadow-lg">
            <div className="relative aspect-video">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Vista previa de tu espacio"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Minicasa acogedora en el bosque</h2>
                  <p className="text-gray-600">Santa Cruz, California, Estados Unidos</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">Nuevo</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between py-3 border-t">
                  <div className="font-medium">Precio por noche</div>
                  <div className="font-semibold">$310.000 COP</div>
                </div>

                <div className="flex justify-between py-3 border-t">
                  <div className="font-medium">Estado</div>
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Publicado
                  </div>
                </div>

                <div className="flex justify-between py-3 border-t">
                  <div className="font-medium">Disponibilidad</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Disponible ahora</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-4">¿Qué sigue?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="bg-rose-100 text-rose-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6" />
                </div>
                <h4 className="font-medium mb-2">Actualiza tu calendario</h4>
                <p className="text-gray-600 text-sm">Mantén tu disponibilidad al día para recibir reservas.</p>
              </div>

              <div className="p-4">
                <div className="bg-rose-100 text-rose-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share2 className="h-6 w-6" />
                </div>
                <h4 className="font-medium mb-2">Comparte tu espacio</h4>
                <p className="text-gray-600 text-sm">Promociona tu publicación en redes sociales.</p>
              </div>

              <div className="p-4">
                <div className="bg-rose-100 text-rose-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6" />
                </div>
                <h4 className="font-medium mb-2">Prepárate para huéspedes</h4>
                <p className="text-gray-600 text-sm">Revisa las guías para ser un buen anfitrión.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

