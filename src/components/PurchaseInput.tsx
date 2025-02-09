"use client"

import type React from "react"
import { useState } from "react"

type Purchase = {
    id: string
    name: string
    price: number
    quantity: number
    unit: string
    pricePerUnit: number
}

type PurchaseInputProps = {
    onAddPurchase: (purchase: Purchase) => void
}

export default function PurchaseInput({ onAddPurchase }: PurchaseInputProps) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [unit, setUnit] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newPurchase: Purchase = {
            id: Date.now().toString(),
            name,
            price: Number.parseFloat(price),
            quantity: Number.parseFloat(quantity),
            unit,
            pricePerUnit: Number.parseFloat(price) / Number.parseFloat(quantity),
        }
        onAddPurchase(newPurchase)
        setName("")
        setPrice("")
        setQuantity("")
        setUnit("")
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 text-white">
            <h2 className="text-2xl font-bold text-amber-50 mb-6">Agregar Compra</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del ingrediente"
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Precio"
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    required
                    min="0"
                    step="0.01"
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Cantidad"
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    required
                    min="0"
                    step="0.01"
                />
                <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="p-3 border text-gray-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    required
                >
                    <option value="">Seleccionar unidad</option>
                    <option value="g">Gramos</option>
                    <option value="kg">Kilogramos</option>
                    <option value="ml">Mililitros</option>
                    <option value="l">Litros</option>
                    <option value="unidad">Unidad</option>
                </select>
            </div>
            <button
                type="submit"
                className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 my-2"
            >
                Agregar Compra
            </button>
        </form>

    )
}

