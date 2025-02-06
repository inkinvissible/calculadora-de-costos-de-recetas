"use client"

import { useState } from "react"

type Purchase = {
    id: string
    name: string
    price: number
    quantity: number
    unit: string
    pricePerUnit: number
}

type PurchaseListProps = {
    purchases: Purchase[]
    onEditPurchase: (id: string, purchase: Purchase) => void
    onDeletePurchase: (id: string) => void
}

export default function PurchaseList({ purchases, onEditPurchase, onDeletePurchase }: PurchaseListProps) {
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState("")
    const [editPrice, setEditPrice] = useState("")
    const [editQuantity, setEditQuantity] = useState("")
    const [editUnit, setEditUnit] = useState("")

    const handleEdit = (purchase: Purchase) => {
        setEditingId(purchase.id)
        setEditName(purchase.name)
        setEditPrice(purchase.price.toString())
        setEditQuantity(purchase.quantity.toString())
        setEditUnit(purchase.unit)
    }

    const handleSave = (id: string) => {
        const updatedPurchase: Purchase = {
            id,
            name: editName,
            price: Number.parseFloat(editPrice),
            quantity: Number.parseFloat(editQuantity),
            unit: editUnit,
            pricePerUnit: Number.parseFloat(editPrice) / Number.parseFloat(editQuantity),
        }
        onEditPurchase(id, updatedPurchase)
        setEditingId(null)
    }

    return (
        <div className="my-4 text-white">
            <h2 className="text-xl font-semibold mb-2">Lista de Compras</h2>
            <ul>
                {purchases.map((purchase) => (
                    <li key={purchase.id} className="mb-2 p-2 border rounded">
                        {editingId === purchase.id ? (
                            <div className="grid grid-cols-5 gap-2">
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="p-1 border rounded"
                                />
                                <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    className="p-1 border rounded"
                                    min="0"
                                    step="0.01"
                                />
                                <input
                                    type="number"
                                    value={editQuantity}
                                    onChange={(e) => setEditQuantity(e.target.value)}
                                    className="p-1 border rounded"
                                    min="0"
                                    step="0.01"
                                />
                                <select value={editUnit} onChange={(e) => setEditUnit(e.target.value)} className="p-1 border rounded">
                                    <option value="g">Gramos</option>
                                    <option value="kg">Kilogramos</option>
                                    <option value="ml">Mililitros</option>
                                    <option value="l">Litros</option>
                                    <option value="unidad">Unidad</option>
                                </select>
                                <button
                                    onClick={() => handleSave(purchase.id)}
                                    className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        ) : (
                            <>
                                {purchase.name} - {purchase.quantity} {purchase.unit} - ${purchase.price.toFixed(2)}
                                (${purchase.pricePerUnit.toFixed(2)}/{purchase.unit})
                                <button
                                    onClick={() => handleEdit(purchase)}
                                    className="ml-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDeletePurchase(purchase.id)}
                                    className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

