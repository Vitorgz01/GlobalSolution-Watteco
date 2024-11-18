"use client"
import React, { useState, useEffect } from 'react';
import Form from './Form'


export default function GerencVeiculos() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        fetch("/data/vehicles.json")
            .then((response) => response.json())
            .then((data) => setVehicles(data))
            .catch((error) => console.error("Erro ao carregar os veículos:", error));
    }, []);

    const handleAddVehicle = (newVehicle: Vehicle) => {
        setVehicles([...vehicles, { ...newVehicle, id: Date.now() }]);
    };

    const handleDeleteVehicle = (id: number) => {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    };

    const handleEditVehicle = (updatedVehicle: Vehicle) => {
        setVehicles(
            vehicles.map((vehicle) =>
                vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
            )
        );
        setEditingVehicle(null); // Fecha o modo de edição
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gerenciamento de Veículos</h1>

            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border p-4 mb-4 rounded">
                    <p><strong>Placa:</strong> {vehicle.placa}</p>
                    <p><strong>Marca:</strong> {vehicle.marca}</p>
                    <p><strong>Tipo de Motor:</strong> {vehicle.tipoMotor}</p>
                    <button
                        onClick={() => setEditingVehicle(vehicle)}
                        className="mr-2 text-blue-500"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => handleDeleteVehicle(vehicle.id!)}
                        className="text-red-500"
                    >
                        Excluir
                    </button>
                </div>
            ))}

            <h2 className="text-xl font-semibold mb-4">
                {editingVehicle ? "Editar Veículo" : "Adicionar Veículo"}
            </h2>
            <Form
                vehicle={editingVehicle}
                onSave={editingVehicle ? handleEditVehicle : handleAddVehicle}
                onCancel={() => setEditingVehicle(null)}
            />
        </div>
    );
}