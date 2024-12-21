import { Button } from '@/components/ui/button';
import { Equal, Delete, Plus, Minus, X, Divide, Percent } from 'lucide-react';
import { useCalculator } from '@/hooks/useCalculator';

export const StandardCalculator = () => {
    const {
        display,
        previousValue,
        operation,
        handleNumber,
        handleOperation,
        handleEqual,
        handleClear,
        handleDelete,
        handleDecimal,
    } = useCalculator();

    return (
        <div className="w-full">
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 mb-4">
                <div className="text-gray-300 text-sm h-6">
                    {previousValue && `${previousValue} ${operation}`}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-wider text-right overflow-x-auto">
                    {display}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-sm sm:text-base"
                    onClick={handleClear}
                >
                    C
                </Button>
                <Button
                    variant="secondary"
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={() => handleOperation('%')}
                >
                    <Percent className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={handleDelete}
                >
                    <Delete className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    className="bg-orange-600 hover:bg-orange-500 text-white"
                    onClick={() => handleOperation('/')}
                >
                    <Divide className="h-4 w-4" />
                </Button>
                {[7, 8, 9].map((num) => (
                    <Button
                        key={num}
                        variant="ghost"
                        className="bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleNumber(num.toString())}
                    >
                        {num}
                    </Button>
                ))}
                <Button
                    variant="secondary"
                    className="bg-orange-600 hover:bg-orange-500 text-white"
                    onClick={() => handleOperation('*')}
                >
                    <X className="h-4 w-4" />
                </Button>
                {[4, 5, 6].map((num) => (
                    <Button
                        key={num}
                        variant="ghost"
                        className="bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleNumber(num.toString())}
                    >
                        {num}
                    </Button>
                ))}
                <Button
                    variant="secondary"
                    className="bg-orange-600 hover:bg-orange-500 text-white"
                    onClick={() => handleOperation('-')}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                {[1, 2, 3].map((num) => (
                    <Button
                        key={num}
                        variant="ghost"
                        className="bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleNumber(num.toString())}
                    >
                        {num}
                    </Button>
                ))}
                <Button
                    variant="secondary"
                    className="bg-orange-600 hover:bg-orange-500 text-white"
                    onClick={() => handleOperation('+')}
                >
                    <Plus className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className="bg-gray-800 hover:bg-gray-700 text-white col-span-2"
                    onClick={() => handleNumber('0')}
                >
                    0
                </Button>
                <Button
                    variant="ghost"
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                    onClick={handleDecimal}
                >
                    .
                </Button>
                <Button
                    variant="secondary"
                    className="bg-orange-600 hover:bg-orange-500 text-white"
                    onClick={handleEqual}
                >
                    <Equal className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}; 