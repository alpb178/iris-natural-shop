export interface DeleteModalProps {
  content: string;
  isLoading: boolean;
  onClose: () => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  title: string;
}
