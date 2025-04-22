"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Slider } from "@/app/components/ui/slider"
import { Textarea } from "@/app/components/ui/textarea"

interface PriceOfferModalProps {
  isOpen: boolean
  onClose: () => void
  usuarioUid: string
  propiedadId: number
  productImageUrl?: string
  productPrice: number
  productRating: number
  reviewCount: number
  currency: string
  recommendedPrice?: number
}

export default function PriceOfferModal({
  isOpen = true,
  onClose = () => {},
  usuarioUid = "",
  propiedadId = 0,
  productImageUrl,
  productPrice = 320000.0,
  productRating = 4.8,
  reviewCount = 9,
  currency = "COP",
  recommendedPrice,
}: PriceOfferModalProps) {
  const colors = {
    primary: "#2A8C82",
    secondary: "#41BFB3",
    accent: "#91F2E9",
    dark: "#275950",
    danger: "#260101",
  }

  const [offerSent, setOfferSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [offerAmount, setOfferAmount] = useState(productPrice * 0.9)
  const [sliderValue, setSliderValue] = useState<[number]>([productPrice * 0.9])
  const [justification, setJustification] = useState("")

  const fallbackImage =
    "https://firebasestorage.googleapis.com/v0/b/tu-app.appspot.com/o/placeholder.svg?alt=media"

  // Validar el propiedadId antes de construir la URL
  const getImageUrl = () => {
    if (!propiedadId || propiedadId <= 0) {
      return fallbackImage;
    }
    return productImageUrl || `http://localhost:4000/api/propiedades/publicacion/${propiedadId}`;
  };

  const [imgSrc, setImgSrc] = useState(getImageUrl())

  useEffect(() => {
    // Actualizar imagen cuando cambien las props
    setImgSrc(getImageUrl());
    
    // Log para depuración
    console.log("Parámetros del modal:", { usuarioUid, propiedadId, productPrice });
    
    // Validar parámetros críticos
    if (!usuarioUid) {
      setError("Error: No se detectó un usuario autenticado");
    }
    if (!propiedadId || propiedadId <= 0) {
      setError("Error: ID de propiedad inválido");
    }
  }, [usuarioUid, propiedadId, productImageUrl, productPrice]);

  const handleImageError = () => {
    setImgSrc(fallbackImage)
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount)

  const handleSliderChange = (value: number[]) => {
    setSliderValue([value[0]])
    setOfferAmount(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "")
    const value = parseFloat(onlyNumbers)
    if (!isNaN(value)) {
      setOfferAmount(value)
      setSliderValue([value])
    }
  }

  const handleSubmitOffer = async () => {
    // Validar parámetros críticos antes de enviar
    if (!usuarioUid) {
      setError("Debes iniciar sesión para enviar una oferta");
      return;
    }
    
    if (!propiedadId || propiedadId <= 0) {
      setError("ID de propiedad inválido");
      return;
    }

    // Validar que el mensaje no esté vacío antes de enviar
    if (!justification || justification.trim() === "") {
      setError("El mensaje es obligatorio al crear una oferta.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Imprimir datos para depuración
      console.log("Enviando datos:", {
        usuario_uid: usuarioUid,
        propiedad_id: propiedadId,
        precio_ofrecido: offerAmount,
        mensaje: justification,
      });

      const res = await fetch("http://localhost:4000/api/ofertas", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_uid: usuarioUid,
          propiedad_id: propiedadId,
          precio_ofrecido: offerAmount,
          mensaje: justification,
        }),
      });

      // Obtener el texto de respuesta para diagnóstico
      const responseText = await res.text();
      
      if (!res.ok) {
        console.error("Error de respuesta:", res.status, responseText);
        throw new Error(`Status ${res.status}: ${responseText}`);
      }
      
      // Intentar parsear como JSON si es posible
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(responseText);
        console.log("Respuesta exitosa:", jsonResponse);
      } catch (e) {
        console.log("Respuesta no es JSON:", responseText);
      }
      
      setOfferSent(true);
    } catch (err: any) {
      console.error("Error al enviar la oferta", err);
      setError(`No se pudo enviar la oferta: ${err.message || "Error desconocido"}`);
    } finally {
      setLoading(false);
    }
  }

  const handleCancelOffer = () => {
    setOfferSent(false);
    setJustification("");
    setError(null);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="rounded-lg w-full max-w-md overflow-hidden shadow-lg"
        style={{ backgroundColor: "#fff", borderTop: `4px solid ${colors.primary}` }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          <h2 className="text-xl font-bold">¡OFRECE UN PRECIO!</h2>
          <button onClick={onClose} aria-label="Cerrar">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex justify-end mb-2">
            <div className="flex items-center gap-1 text-sm">
              <span>★ {productRating}</span>
              <span className="text-gray-600">({reviewCount} reseñas)</span>
            </div>
          </div>

          <div className="w-full h-40 rounded-md overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
            <Image
              src={imgSrc}
              alt="Imagen propiedad"
              width={200}
              height={150}
              unoptimized
              onError={handleImageError}
              className="object-cover"
            />
          </div>

          <div className="text-center mb-4">
            <p className="font-medium">{formatCurrency(productPrice)} Mensual</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          {!offerSent ? (
            <>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Tu oferta:</label>
                <Input
                  value={`${currency} ${offerAmount.toLocaleString()}`}
                  onChange={handleInputChange}
                  className="w-40 bg-white"
                />
              </div>

              <Slider
                value={sliderValue}
                min={productPrice * 0.5}
                max={productPrice * 1.2}
                step={1000}
                onValueChange={handleSliderChange}
                className="my-4"
              />

              <Textarea
                placeholder="Justifica tu oferta..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="w-full bg-white"
              />

              <Button
                onClick={handleSubmitOffer}
                disabled={loading || !usuarioUid || propiedadId <= 0}
                className="w-full"
                style={{
                  backgroundColor: colors.secondary,
                  color: "#fff",
                  opacity: loading || !usuarioUid || propiedadId <= 0 ? 0.6 : 1,
                }}
              >
                {loading ? "Enviando..." : "¡OFRECER PRECIO!"}
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Precio recomendado:</p>
                <p className="font-medium">
                  {recommendedPrice ? formatCurrency(recommendedPrice) : "——"}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Oferta enviada:</p>
                <p className="font-medium">{formatCurrency(offerAmount)}</p>
              </div>

              <Button
                className="w-full"
                disabled
                style={{ backgroundColor: colors.dark, color: "#fff" }}
              >
                ¡OFERTA ENVIADA!
              </Button>

              <Button
                variant="ghost"
                onClick={handleCancelOffer}
                className="w-full"
                style={{ color: colors.danger }}
              >
                Cancelar oferta
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}