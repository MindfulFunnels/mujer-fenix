// src/components/RegisteredDashboard.tsx
import { useEffect, useState } from "react";

export default function RegisteredDashboard() {
  const [registered, setRegistered] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/registered")
      .then((res) => res.json())
      .then((data) => setRegistered(data));
  }, []);

  return (
    <div className=" rounded-lg shadow-md overflow-hidden text-white">
      <h1>Dashboard de Registered</h1>
      <p>Total: {registered.length}</p>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {registered.map((item, i) => (
            <tr key={i} className="border-b border-gray-20">
              <td className="py-4 px-6">{item.name}</td>
              <td className="py-4 px-6">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
