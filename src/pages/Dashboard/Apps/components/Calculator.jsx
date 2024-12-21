import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorSelector } from './CalculatorSelector';
import { StandardCalculator } from './StandardCalculator';
import { ScientificCalculator } from './ScientificCalculator';
import { UnitCalculator } from './UnitCalculator';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { IoArrowBack } from 'react-icons/io5';

export const Calculator = () => {
    const [calculatorType, setCalculatorType] = useState('standard');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/dashboard/apps');
    };

    return (
        <div className="relative h-full w-full flex items-center justify-center p-4">
            <ShinyButton
                onClick={handleBack}
                variant="ghost"
                size="sm"
                icon={<IoArrowBack />}
                className="absolute top-4 left-4 backdrop-blur-md"
            />
            <div className="w-full max-w-[480px] bg-gray-900 rounded-lg p-4 sm:p-6">
                <CalculatorSelector selected={calculatorType} onSelect={setCalculatorType} />
                <div className="mt-4">
                    {calculatorType === 'standard' && <StandardCalculator />}
                    {calculatorType === 'scientific' && <ScientificCalculator />}
                    {calculatorType === 'unit' && <UnitCalculator />}
                </div>
            </div>
        </div>
    );
};