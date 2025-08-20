export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  methods: any;
  selectedDate: Date | null;
  selectedTime: string | null;
  name: string;
  email: string;
  isSubmitting?: boolean;
  submitResult?: { success: boolean; message: string } | null;
  onSubmit?: () => void;
  onClose?: () => void;
}
