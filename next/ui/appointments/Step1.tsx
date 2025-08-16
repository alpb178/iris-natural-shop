import { Button } from "@/components/button/Button";
import { Text } from "@/components/text/Text";
import dayjs from "dayjs";
import { Calendar } from "react-calendar";
import { StepProps } from "./StepProps";

export const Step1 = ({
  onNext,
  methods,
  selectedDate,
  selectedTime,
  availableSlots
}: StepProps) => {
  return (
    <div className="slide-in-from-right-4 flex flex-col space-y-6 animate-in duration-300">
      <Text
        content="Selecciona fecha y hora"
        className="font-merriweather font-bold text-3xl"
      />

      <div className="w-full">
        <Calendar
          onChange={(date) => {
            methods.setValue("date", date as Date);
            methods.setValue("time", null);
          }}
          value={selectedDate}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
          minDetail="year"
          maxDetail="month"
        />
      </div>

      <div className="mt-4 w-full">
        {availableSlots.length > 0 && (
          <div className="gap-4 grid grid-cols-2">
            {availableSlots.map((slot) => (
              <Button
                key={slot.toString()}
                type="button"
                variant={
                  selectedTime?.toString() ===
                  dayjs(slot).format("HH:mm:ss.SSS")
                    ? "solid"
                    : "outline"
                }
                onClick={() =>
                  methods.setValue("time", dayjs(slot).format("HH:mm:ss.SSS"))
                }
                label={dayjs(slot).format("HH:mm")}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
          label="Siguiente"
        />
      </div>
    </div>
  );
};
