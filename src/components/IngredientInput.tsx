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

type Ingredient = {
    id: string
    name: string
    quantity: number
    unit: string
    cost: number
}

type IngredientInputProps = {
    onAddIngredient: (ingredient: Ingredient) => void
    onEditIngredient: (id: string, ingredient: Ingredient) => void
    onDeleteIngredient: (id: string) => void
    purchases: Purchase[]
}

export default function IngredientInput({
                                            onAddIngredient,
                                            onDeleteIngredient,
                                            purchases,
                                        }: IngredientInputProps) {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [unit, setUnit] = useState("")
    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedPurchase) return

        const newIngredient: Ingredient = {
            id: Date.now().toString(),
            name,
            quantity: Number.parseFloat(quantity),
            unit,
            cost: selectedPurchase.pricePerUnit * Number.parseFloat(quantity),
        }

        onAddIngredient(newIngredient)
        setIngredients([...ingredients, newIngredient])
        setName("")
        setQuantity("")
        setUnit("")
        setSelectedPurchase(null)
    }

    const handleEdit = (id: string) => {
        const ingredient = ingredients.find((ing) => ing.id === id)
        if (ingredient) {
            setName(ingredient.name)
            setQuantity(ingredient.quantity.toString())
            setUnit(ingredient.unit)
            const purchase = purchases.find((p) => p.name === ingredient.name)
            if (purchase) setSelectedPurchase(purchase)
        }
    }

    const handleDelete = (id: string) => {
        onDeleteIngredient(id)
        setIngredients(ingredients.filter((ing) => ing.id !== id))
    }

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Ingredientes de la Receta</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <select
                        value={selectedPurchase ? selectedPurchase.id : ""}
                        onChange={(e) => {
                            const purchase = purchases.find((p) => p.id === e.target.value)
                            if (purchase) {
                                setSelectedPurchase(purchase)
                                setName(purchase.name)
                                setUnit(purchase.unit)
                            }
                        }}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar ingrediente</option>
                        {purchases.map((purchase) => (
                            <option key={purchase.id} value={purchase.id}>
                                {purchase.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Cantidad"
                        className="p-2 border rounded"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <button type="submit" className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 my-2">
                    Agregar Ingrediente
                </button>
            </form>
            <ul>
                <h2 className="text-xl font-semibold mb-2"> Lista de ingredientes </h2>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="mb-2 p-2 border rounded">
                        {ingredient.name} - {ingredient.quantity} {ingredient.unit} - ${ingredient.cost.toFixed(2)}
                        <button
                            onClick={() => handleEdit(ingredient.id)}
                            className="ml-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(ingredient.id)}
                            className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

