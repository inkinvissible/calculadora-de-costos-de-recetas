const About = () => {
    return (
        <div className="max-w-5xl mx-auto md:my-16 m-4 bg-gray-800 p-8 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">
                ¿Qué me permite hacer esta calculadora de costos de receta?
            </h2>
            <p className="mb-6 text-lg">
                Esta calculadora permite calcular los costos de tus recetas. Solo es necesario agregar
                los productos que has comprado para tu receta, tal cual los compraste en el supermercado,
                en el hipermercado, en el kiosco, o en algún otro lugar. Por ejemplo, si compraste{" "}
                <span className="italic font-medium">
          Manteca por 200 gramos a $1800,
        </span>{" "}
                lo agregas a la lista de compras y listo. Ya tenés todo lo necesario para empezar a calcular
                los costos de tu receta.
            </p>

            <h2 className="text-2xl font-bold mb-4">
                ¿Cómo se calcula el costo de la receta?
            </h2>
            <p className="mb-6 text-lg">
                El costo de la receta se calcula obteniendo el precio por unidad (ya sea precio por gramo,
                precio por litro, precio por unidad) y luego se calcula el precio en la sección de ingredientes,
                multiplicando el precio por unidad por la cantidad.
            </p>

            <h2 className="text-2xl font-bold mb-4">
                ¿Cómo empezar a utilizarla?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-lg">
                <li>Primero, se deben ingresar las compras que se han hecho para la receta.</li>
                <li>
                    Luego, se selecciona el primer ingrediente en la sección "Ingredientes de la receta" y se ingresa
                    la cantidad.
                </li>
                <li>
                    Se presiona "Agregar Ingrediente" y se calculará el precio adecuado de la cantidad.
                </li>
                <li>Repetir el proceso por la cantidad de ingredientes.</li>
                <li>Por último, se pueden ajustar las cantidades.</li>
            </ol>
        </div>
    );
};

export default About;
