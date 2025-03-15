"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Slider } from "@/app/components/ui/slider"
import { Textarea } from "@/app/components/ui/textarea"

interface PriceOfferModalProps {
  isOpen: boolean
  onClose: () => void
  productImage: string
  productPrice: number
  productRating: number
  reviewCount: number
  currency: string
  recommendedPrice?: number
}

export default function PriceOfferModal({
  isOpen = true,
  onClose = () => {},
  productImage = "/placeholder.svg?height=150&width=200",
  productPrice = 320000.0,
  productRating = 4.8,
  reviewCount = 9,
  currency = "COP",
  recommendedPrice,
}: PriceOfferModalProps) {
  const [offerSent, setOfferSent] = useState(false)
  const [offerAmount, setOfferAmount] = useState(productPrice * 0.9)
  const [sliderValue, setSliderValue] = useState([productPrice * 0.9])
  const [justification, setJustification] = useState("")

  if (!isOpen) return null

  const handleSubmitOffer = () => {
    setOfferSent(true)
  }

  const handleCancelOffer = () => {
    setOfferSent(false)
  }

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    setOfferAmount(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value.replace(/[^0-9]/g, ""))
    if (!isNaN(value)) {
      setOfferAmount(value)
      setSliderValue([value])
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">¡OFRECE UN PRECIO!</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg mx-4 my-4">
          <div className="flex justify-end mb-1">
            <div className="flex items-center gap-1">
              <span className="text-sm">★ {productRating}</span>
              <span className="text-sm text-gray-600">({reviewCount} RESEÑAS)</span>
            </div>
          </div>

          <div className="bg-gray-400 h-36 w-full rounded-md mb-4 flex items-center justify-center">
            <Image
              src={productImage || "/placeholder.svg"}
              alt="Product image"
              width={200}
              height={150}
              className="object-cover"
            />
          </div>

          <div className="text-center mb-4">
            <p className="font-medium">{formatCurrency(productPrice)} Mensual</p>
          </div>

          {!offerSent ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Ofrezca su precio:</label>
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
                className="my-6"
              />

              <Textarea
                placeholder="Justificar precio..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="w-full bg-white"
              />

              <Button onClick={handleSubmitOffer} className="w-full bg-black text-white hover:bg-gray-800">
                ¡OFRECER PRECIO!
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Precio recomendado:</p>
                <p className="font-medium">$$$$</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Oferta enviada:</p>
                <p className="font-medium">{currency} $$$$$$</p>
              </div>

              <Button className="w-full bg-black text-white hover:bg-gray-800" disabled>
                ¡SE HA ENVIADO LA OFERTA!
              </Button>

              <Button variant="ghost" onClick={handleCancelOffer} className="w-full text-gray-600 hover:text-gray-800">
                Cancelar oferta
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}