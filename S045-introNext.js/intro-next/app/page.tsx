"use client"
import Counter from "./components/Counter";

export default function Home() {
  return (
    <>
      <h1>Bienvenido a Mi App con Next.js</h1>
      {/* Este componente Counter es del lado del cliente por lo que se debe usar "use client" al inicio del archivo. */}
      <Counter /> 
    </>
  );
}
