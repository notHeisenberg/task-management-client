import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Calculator as CalcIcon, FlaskConical, Ruler } from 'lucide-react';

export const CalculatorSelector = ({ selected, onSelect }) => {
    return (
        <div className="flex flex-col xs:flex-row gap-2 w-full">
            <Button
                variant={selected === 'standard' ? 'default' : 'outline'}
                onClick={() => onSelect('standard')}
                className="flex gap-2 justify-center flex-1"
            >
                <CalcIcon className="h-4 w-4" />
                <span className="hidden xs:inline">Standard</span>
            </Button>
            <Button
                variant={selected === 'scientific' ? 'default' : 'outline'}
                onClick={() => onSelect('scientific')}
                className="flex gap-2 justify-center flex-1"
            >
                <FlaskConical className="h-4 w-4" />
                <span className="hidden xs:inline">Scientific</span>
            </Button>
            <Button
                variant={selected === 'unit' ? 'default' : 'outline'}
                onClick={() => onSelect('unit')}
                className="flex gap-2 justify-center flex-1"
            >
                <Ruler className="h-4 w-4" />
                <span className="hidden xs:inline">Unit Converter</span>
            </Button>
        </div>
    );
};

CalculatorSelector.propTypes = {
    selected: PropTypes.oneOf(['standard', 'scientific', 'unit']).isRequired,
    onSelect: PropTypes.func.isRequired
}; 