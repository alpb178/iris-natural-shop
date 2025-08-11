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
    <div className="slide-in-from-right-4 space-y-6 animate-in duration-300">
      <Text
        as="title"
        content="Selecciona fecha y hora"
        className="text-lg text-center"
      />

      <div className="gap-6">
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

        <div className="w-full">
          {availableSlots.length > 0 && (
            <div className="gap-2 grid grid-cols-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot.toString()}
                  type="button"
                  className={`px-3 py-2 rounded-lg border ${
                    selectedTime?.toString() ===
                    dayjs(slot).format("HH:mm:ss.SSS")
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() =>
                    methods.setValue("time", dayjs(slot).format("HH:mm:ss.SSS"))
                  }
                >
                  {dayjs(slot).format("HH:mm")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="solid"
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
