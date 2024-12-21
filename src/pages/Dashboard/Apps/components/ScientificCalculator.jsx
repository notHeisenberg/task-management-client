import { Button } from '@/components/ui/button';
import { Equal, Delete, Plus, Minus, X, Divide, Percent } from 'lucide-react';
import { useCalculator } from '@/hooks/useCalculator';

export const ScientificCalculator = () => {
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
        handleScientific,
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
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2">
                {/* Scientific Functions Row 1 */}
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('sin')}
                >
                    sin
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('cos')}
                >
                    cos
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('tan')}
                >
                    tan
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('sqrt')}
                >
                    √
                </Button>

                {/* Scientific Functions Row 2 */}
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('log')}
                >
                    log
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('ln')}
                >
                    ln
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('nPr')}
                >
                    nPr
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleScientific('nCr')}
                >
                    nCr
                </Button>

                {/* Operations Row */}
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={handleClear}
                >
                    C
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={() => handleOperation('%')}
                >
                    <Percent className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm"
                    onClick={handleDelete}
                >
                    <Delete className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm"
                    onClick={() => handleOperation('/')}
                >
                    <Divide className="h-4 w-4" />
                </Button>

                {/* Number Pad */}
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('7')}
                >
                    7
                </Button>
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('8')}
                >
                    8
                </Button>
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('9')}
                >
                    9
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm"
                    onClick={() => handleOperation('*')}
                >
                    <X className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('4')}
                >
                    4
                </Button>
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('5')}
                >
                    5
                </Button>
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('6')}
                >
                    6
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm"
                    onClick={() => handleOperation('-')}
                >
                    <Minus className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('1')}
                >
                    1
                </Button>
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('2')}
                >
                    2
                </Button>
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={() => handleNumber('3')}
                >
                    3
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm"
                    onClick={() => handleOperation('+')}
                >
                    <Plus className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm col-span-2"
                    onClick={() => handleNumber('0')}
                >
                    0
                </Button>
                <Button
                    variant="ghost"
                    className="h-12 sm:h-14 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm"
                    onClick={handleDecimal}
                >
                    .
                </Button>
                <Button
                    variant="secondary"
                    className="h-12 sm:h-14 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm"
                    onClick={handleEqual}
                >
                    <Equal className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}; 