"use client"

import { useState, useEffect } from "react"
import PurchaseInput from "./components/PurchaseInput.tsx"
import IngredientInput from "./components/IngredientInput.tsx"
import RecipeSummary from "./components/RecipeSummary.tsx"
import PurchaseList from "./components/PurchaseList.tsx"

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

export default function RecipeExpenseCalculator() {
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [servings, setServings] = useState<number>(1)
    const [totalCost, setTotalCost] = useState<number>(0)

    useEffect(() => {
        const newTotalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.cost, 0)
        setTotalCost(newTotalCost)
    }, [ingredients])

    const addPurchase = (purchase: Purchase) => {
        setPurchases([...purchases, purchase])
    }

    const addIngredient = (ingredient: Ingredient) => {
        setIngredients([...ingredients, ingredient])
    }

    const editIngredient = (id: string, updatedIngredient: Ingredient) => {
        setIngredients(ingredients.map((ing) => (ing.id === id ? updatedIngredient : ing)))
    }

    const deleteIngredient = (id: string) => {
        setIngredients(ingredients.filter((ing) => ing.id !== id))
    }

    const editPurchase = (id: string, updatedPurchase: Purchase) => {
        setPurchases(purchases.map((purchase) => (purchase.id === id ? updatedPurchase : purchase)))
    }

    const deletePurchase = (id: string) => {
        setPurchases(purchases.filter((purchase) => purchase.id !== id))
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Calculadora de Gastos de Receta</h1>

            <div className="md:flex justify-around w-8xl mx-auto">
                <div className="max-w-lg mx-auto p-6 bg-gray-950 text-white shadow-md rounded-lg">
                    <PurchaseInput onAddPurchase={addPurchase} />
                    <PurchaseList purchases={purchases} onEditPurchase={editPurchase} onDeletePurchase={deletePurchase} />
                </div>
                <div className="max-w-lg mx-auto p-6 bg-gray-950 text-white shadow-md rounded-lg">
                    <IngredientInput
                        onAddIngredient={addIngredient}
                        onEditIngredient={editIngredient}
                        onDeleteIngredient={deleteIngredient}
                        purchases={purchases}
                    />
                </div>
            </div>
            <RecipeSummary
                ingredients={ingredients}
                totalCost={totalCost}
                servings={servings}
                onServingsChange={setServings}
            />
        </div>
    )
}

