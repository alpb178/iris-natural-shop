"use client";

import { Button } from "@/components/button/Button";
import { Container } from "@/components/container/Container";
import { Modal } from "@/components/modal/Modal";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";

type FormData = {
  date: Date | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
};

type Step = 1 | 2 | 3;

export function BookAppointmentModal() {
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  const [open, setOpen] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: {
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: null,
      name: "",
      email: "",
      phone: ""
    },
    mode: "onChange"
  });

  const selectedDate = methods.watch("date");
  const selectedTime = methods.watch("time");
  const name = methods.watch("name");
  const email = methods.watch("email");

  useEffect(() => {
    if (selectedDate) {
      const date = dayjs(selectedDate).format("YYYY-MM-DD");
      // Fetch available slots from the new API endpoint
      fetch(`/api/available-slots?date=${date}`)
        .then((res) => res.json())
        .then((data) => {
          // Convert ISO strings to Date objects
          setAvailableSlots(
            data.availableSlots.map((iso: string) => new Date(iso))
          );
        });
    }
  }, [selectedDate]);

  const handleNext = () => {
    setSlideDirection("right");
    if (currentStep === 1 && selectedDate && selectedTime) {
      setCurrentStep(2);
    } else if (currentStep === 2 && name && email) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setSlideDirection("left");
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
        time: selectedTime,
        email: email,
        name: name,
        phone: methods.getValues("phone")
      };

      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(appointmentData)
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setSubmitResult({
            success: false,
            message: result.error || "Esta cita ya no está disponible"
          });
        } else {
          setSubmitResult({
            success: false,
            message: "Error al reservar la cita. Por favor, inténtalo de nuevo."
          });
        }
        return;
      }

      setSubmitResult({
        success: true,
        message: "¡Cita reservada exitosamente!"
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      setSubmitResult({
        success: false,
        message: "Error al reservar la cita. Por favor, inténtalo de nuevo."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitResult?.success) {
      setOpen(false);
      setCurrentStep(1);
      setSubmitResult(null);
      methods.reset();
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-6">
      <div className="bg-muted rounded-full w-full h-1.5">
        <div
          className="bg-foreground rounded-full h-1.5 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: handleNext,
      onBack: handleBack,
      methods,
      selectedDate,
      selectedTime,
      availableSlots,
      name,
      email,
      isSubmitting,
      submitResult,
      onSubmit: handleSubmit,
      onClose: handleClose
    };

    switch (currentStep) {
      case 1:
        return <Step1 {...stepProps} />;
      case 2:
        return <Step2 {...stepProps} />;
      case 3:
        return <Step3 {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} label="Pedir cita" />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        position="right"
        className="bg-card"
      >
        <Container>
          {renderStepIndicator()}

          <FormProvider {...methods}>
            <div className="relative">{renderCurrentStep()}</div>
          </FormProvider>
        </Container>
      </Modal>
    </>
  );
}
