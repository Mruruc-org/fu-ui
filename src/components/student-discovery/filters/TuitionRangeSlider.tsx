import * as Slider from "@radix-ui/react-slider";

interface TuitionRangeSliderProps {
  value: [number, number];
  max: number;
  step: number;
  onChange: (value: [number, number]) => void;
}

const TuitionRangeSlider = ({
  value,
  max,
  step,
  onChange,
}: TuitionRangeSliderProps) => {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(num);
  };
  return (
    <div className="relative my-6 pt-2">
      <label className="text-sm font-semibold text-gray-600 mb-2 block">
        Tuition Range
      </label>
      <div className="flex justify-between items-center text-sm text-gray-800 font-medium mb-4">
        <span>{formatCurrency(value[0])}</span>
        <span>{formatCurrency(value[1])}</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        onValueChange={(newValue) => onChange(newValue as [number, number])}
        max={max}
        step={step}
        minStepsBetweenThumbs={1}>
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-lg rounded-full border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          aria-label="Minimum tuition"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-lg rounded-full border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          aria-label="Maximum tuition"
        />
      </Slider.Root>
    </div>
  );
};
export default TuitionRangeSlider;
