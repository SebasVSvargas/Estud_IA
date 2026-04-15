
import { useState } from "react";

//Este componente es de lado cliente
export default function Counter() {
  const [count, setCount] = useState(0);


  return (
    <div className="p-4 bg-blue-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contador: {count}</h2>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Increment Count
      </button>
    </div>
  );
}