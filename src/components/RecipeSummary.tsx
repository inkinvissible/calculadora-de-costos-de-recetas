type Ingredient = {
    id: string
    name: string
    quantity: number
    unit: string
    cost: number
}

type RecipeSummaryProps = {
    ingredients: Ingredient[]
    totalCost: number
    servings: number
    onServingsChange: (servings: number) => void
}

export default function RecipeSummary({ ingredients, totalCost, servings, onServingsChange }: RecipeSummaryProps) {
    return (
        <div className="mt-4 bg-gray-950 rounded-2xl p-4 text-white w-full mx-auto">
            <h2 className="text-xl font-semibold mb-2">Resumen de la Receta</h2>
            <div className="mb-4">
                <label htmlFor="servings" className="mr-2">
                    Número de porciones:
                </label>
                <input
                    type="number"
                    id="servings"
                    value={servings}
                    onChange={(e) => onServingsChange(Number.parseInt(e.target.value))}
                    className="p-1 border rounded"
                    min="1"
                />
            </div>
            <ul className="mb-4">
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="mb-1">
                        {ingredient.name}: {ingredient.quantity} {ingredient.unit} - ${ingredient.cost.toFixed(2)}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(ingredient.cost / totalCost) * 100}%` }}
                            ></div>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="font-bold">Costo total: ${totalCost.toFixed(2)}</p>
            <p className="font-bold">Costo por porción: ${(totalCost / servings).toFixed(2)}</p>
        </div>
    )
}

