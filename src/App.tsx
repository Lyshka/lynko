import React from 'react';
import { convert } from 'number-to-words-ru';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form";
import { formatCurrencyString, formatNumber } from './lib/Formatted';
import { sendInfoDocument } from './lib/api';

type Inputs = {
  costOfClaim: string,
};

const App: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const formatRusString = formatCurrencyString((convert(data.costOfClaim)));
    const formatNumberString = formatNumber(data.costOfClaim);
    const fullPriceString = `${formatNumberString} ${formatRusString}`;

    const { data: info } = await sendInfoDocument({ price: fullPriceString });

    window.location.href = `${import.meta.env.VITE_API_URL}/${info.file_url}`;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} method='POST' className="w-full max-w-sm min-w-[200px]">
        <div className="flex items-center gap-4">
          <Input step={0.01} type='number' {...register("costOfClaim")} />

          <label className='shrink-0'>
            Ценна иска
          </label>
        </div>

        <Button type='submit' className='w-full'>
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default App;