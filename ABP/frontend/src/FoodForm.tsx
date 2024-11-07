import React, { useState } from 'react';
import './FoodForm.css';
import { CalendarCheck } from 'lucide-react';
import Button from './Button';

interface FoodFormProps {
    onAddRecord: (record: { food: string; date: string; amount: string; meal: string }) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onAddRecord }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const foodList = [
        'Arroz carreteiro',
        'Arroz, integral, cozido',
        'Arroz, integral, cru',
        'Arroz, tipo 1, cozido',
        'Arroz, tipo 1, cru',
        'Arroz, tipo 2, cozido',
        'Arroz, tipo 2, cru',
        'Baião de dois, arroz e feijão-de-corda',
        'Bolinho de arroz',
        'Creme de arroz, pó',
        'Farinha, de arroz, enriquecida'
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFoods, setFilteredFoods] = useState<string[]>([]);
    const [selectedFood, setSelectedFood] = useState<string | null>(null);
    const [consumptionDate, setConsumptionDate] = useState('');
    const [consumedAmount, setConsumedAmount] = useState('');
    const [mealType, setMealType] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setSearchTerm(search);
        if (search) {
            const filtered = foodList.filter((food) =>
                food.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredFoods(filtered);
        } else {
            setFilteredFoods([]);
        }
    };

    const handleSelectFood = (food: string) => {
        setSelectedFood(food);
        setSearchTerm(food);
        setFilteredFoods([]);
    };

    const handleSave = () => {
        if (selectedFood && consumptionDate && consumedAmount && mealType) {
            const newRecord = {
                food: selectedFood,
                date: consumptionDate,
                amount: consumedAmount,
                meal: mealType,
            };
            onAddRecord(newRecord);
            setSearchTerm('');
            setSelectedFood(null);
            setConsumptionDate('');
            setConsumedAmount('');
            setMealType('');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className={isModalOpen ? 'blurred-background' : 'auth-button-meal'} style={{ backgroundColor: 'transparent' }}>
            <CalendarCheck
                className='svg-stroke-green-700 set-style-foodform'
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer', transform: 'translateX(-5%)' }}
            />

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <h3>Registro de Consumo Alimentar</h3>

                        <label>Busca alimento ou produto consumido:</label>
                        <input
                            className='input-custom'
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Digite para buscar"
                        />
                        {filteredFoods.length > 0 && (
                            <ul className="dropdown">
                                {filteredFoods.map((food, index) => (
                                    <li
                                        key={index}
                                        className='dropli'
                                        onClick={() => handleSelectFood(food)}
                                        style={{
                                            backgroundColor: selectedFood === food ? '#4b7e56' : '',
                                            color: selectedFood === food ? '#f2f7f3' : ''
                                        }}
                                    >
                                        {food}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <label>Data de consumo:</label>
                        <input
                            className='input-custom'
                            type="date"
                            value={consumptionDate}
                            onChange={(e) => setConsumptionDate(e.target.value)}
                        />

                        <label>Quantidade consumida:</label>
                        <input
                            className='input-custom'
                            type="text"
                            value={consumedAmount}
                            onChange={(e) => setConsumedAmount(e.target.value)}
                            placeholder="Ex: 3 colheres"
                        />

                        <label>Periodo:</label>
                        <select
                            className='input-custom'
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="Cafe da manha">Café da manhã</option>
                            <option value="Almoço">Almoço</option>
                            <option value="Cafe da tarde">Café da tarde</option>
                            <option value="Janta">Janta</option>
                        </select>

                        <Button label={'Salvar'} onClick={handleSave} className='auth-buttonfont-style: italic;'/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodForm;
