import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { convertUnit } from '@/lib/units';

const unitTypes = {
    length: ['m', 'km', 'cm', 'mm', 'inch', 'ft'],
    mass: ['kg', 'g', 'mg', 'lb', 'oz'],
    temperature: ['°C', '°F', 'K'],
};

export const UnitCalculator = () => {
    const [type, setType] = useState('length');
    const [fromUnit, setFromUnit] = useState(unitTypes[type][0]);
    const [toUnit, setToUnit] = useState(unitTypes[type][1]);
    const [value, setValue] = useState('0');
    const [result, setResult] = useState('0');

    const handleConvert = (newValue) => {
        setValue(newValue);
        const numValue = parseFloat(newValue) || 0;
        const converted = convertUnit(numValue, fromUnit, toUnit, type);
        setResult(converted.toFixed(6));
    };

    const handleTypeChange = (newType) => {
        setType(newType);
        setFromUnit(unitTypes[newType][0]);
        setToUnit(unitTypes[newType][1]);
        handleConvert(value);
    };

    return (
        <div className="w-full space-y-4 sm:space-y-6 p-2 sm:p-0">
            <div className="grid gap-1.5 sm:gap-2">
                <Label className="text-sm sm:text-base text-gray-300">Type</Label>
                <Select value={type} onValueChange={handleTypeChange}>
                    <SelectTrigger className="h-9 sm:h-10 bg-gray-800 border-gray-700 text-white text-sm sm:text-base">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="length" className="text-white hover:bg-gray-700 text-sm sm:text-base">Length</SelectItem>
                        <SelectItem value="mass" className="text-white hover:bg-gray-700 text-sm sm:text-base">Mass</SelectItem>
                        <SelectItem value="temperature" className="text-white hover:bg-gray-700 text-sm sm:text-base">Temperature</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-1.5 sm:gap-2">
                <Label className="text-sm sm:text-base text-gray-300">From</Label>
                <div className="flex gap-1.5 sm:gap-2">
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => handleConvert(e.target.value)}
                        className="flex-1 h-9 sm:h-10 min-w-0 bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
                    />
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="h-9 sm:h-10 w-[80px] sm:w-[110px] bg-gray-800 border-gray-700 text-white text-sm sm:text-base">
                            <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            {unitTypes[type].map((unit) => (
                                <SelectItem 
                                    key={unit} 
                                    value={unit}
                                    className="text-white hover:bg-gray-700 text-sm sm:text-base"
                                >
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-1.5 sm:gap-2">
                <Label className="text-sm sm:text-base text-gray-300">To</Label>
                <div className="flex gap-1.5 sm:gap-2">
                    <Input 
                        value={result} 
                        readOnly 
                        className="flex-1 h-9 sm:h-10 min-w-0 bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
                    />
                    <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger className="h-9 sm:h-10 w-[80px] sm:w-[110px] bg-gray-800 border-gray-700 text-white text-sm sm:text-base">
                            <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            {unitTypes[type].map((unit) => (
                                <SelectItem 
                                    key={unit} 
                                    value={unit}
                                    className="text-white hover:bg-gray-700 text-sm sm:text-base"
                                >
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}; 