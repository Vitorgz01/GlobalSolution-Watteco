"use client";
import React, { useState, useEffect } from 'react';

interface VehicleFormProps {
    vehicle: Vehicle | null;
    onSave: (vehicle: Vehicle) => void;
    onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ vehicle, onSave, onCancel }) => {
    const [vehicleData, setVehicleData] = useState<Vehicle>({
        placa: '',
        possuiPlaca: false,
        marca: '',
        tipoMotor: '',
        transmissao: '',
        cor: '',
        quilometragem: '',
        desconheceQuilometragem: false,
        manutencaoRecente: '',
        semManutencaoRecente: false,
        observacoes: '',
        concordaTermos: false,
    });

    useEffect(() => {
        if (vehicle) {
            setVehicleData(vehicle);
        }
    }, [vehicle]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => {
        const { name, value, type, checked } = e.target;
        setVehicleData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!vehicleData.marca || !vehicleData.tipoMotor || !vehicleData.transmissao || !vehicleData.cor || !vehicleData.concordaTermos) {
            alert('Por favor, preencha todos os campos obrigatórios e aceite os Termos de Uso.');
            return;
        }
        onSave({ ...vehicleData, id: vehicle?.id });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">Digite a placa do veículo</label>
                <input
                    type="text"
                    name="placa"
                    placeholder="Digite a placa do veículo"
                    value={vehicleData.placa}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                />
                <div className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        name="possuiPlaca"
                        checked={vehicleData.possuiPlaca}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="possuiPlaca" className="text-gray-500 text-sm">Não sei nem possuo a placa do veículo</label>
                </div>
            </div>

            <div>
                <label className="block text-gray-700">Marca do veículo *</label>
                <input
                    type="text"
                    name="marca"
                    value={vehicleData.marca}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                />
            </div>

            <div>
                <label className="block text-gray-700">Tipo de Motor *</label>
                <input
                    type="text"
                    name="tipoMotor"
                    value={vehicleData.tipoMotor}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                />
            </div>

            <div>
                <label className="block text-gray-700">Transmissão *</label>
                <input
                    type="text"
                    name="transmissao"
                    value={vehicleData.transmissao}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                />
            </div>

            <div>
                <label className="block text-gray-700">Cor *</label>
                <input
                    type="text"
                    name="cor"
                    value={vehicleData.cor}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                />
            </div>

            <div>
                <label className="block text-gray-700">Quilometragem atual</label>
                <input
                    type="text"
                    name="quilometragem"
                    value={vehicleData.quilometragem}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                />
                <div className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        name="desconheceQuilometragem"
                        checked={vehicleData.desconheceQuilometragem}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="desconheceQuilometragem" className="text-gray-500 text-sm">Não sei exatamente a quilometragem</label>
                </div>
            </div>

            <div>
                <label className="block text-gray-700">Manutenção recente</label>
                <input
                    type="text"
                    name="manutencaoRecente"
                    placeholder="Adicionar manutenção"
                    value={vehicleData.manutencaoRecente}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                />
                <div className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        name="semManutencaoRecente"
                        checked={vehicleData.semManutencaoRecente}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="semManutencaoRecente" className="text-gray-500 text-sm">Não possui manutenções recentes</label>
                </div>
            </div>

            <div>
                <label className="block text-gray-700">Observações</label>
                <textarea
                    name="observacoes"
                    value={vehicleData.observacoes}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 mt-1"
                ></textarea>
            </div>

            <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    name="concordaTermos"
                    checked={vehicleData.concordaTermos}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label htmlFor="concordaTermos" className="text-gray-500 text-sm">
                    Concordo com os <a href="#" className="text-blue-500 underline">Termos de Uso</a>
                </label>
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md mt-4">
                {vehicle ? 'Atualizar Veículo' : 'Cadastrar Veículo'}
            </button>
            {vehicle && (
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold p-3 rounded-md mt-4"
                >
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default VehicleForm;
