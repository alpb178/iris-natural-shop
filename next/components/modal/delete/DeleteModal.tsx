import { Button } from '@/components/button/Button';
import { Container } from '@/components/container/Container';
import { Modal } from '@/components/modal/Modal';
import { Text } from '@/components/text/Text';
import { useTranslations } from 'next-intl';
import { DeleteModalProps } from './DeleteModal.props';

export const DeleteModal = ({
  content,
  onClose,
  open,
  title,
  onDelete,
  isLoading
}: DeleteModalProps) => {
  const t = useTranslations();

  return (
    <Modal position="bottom" open={open} onClose={onClose} title={title}>
      <Container>
        <Text className="pb-4 text-muted-foreground" content={content} />

        <div className="flex justify-end space-x-4 mt-4 mb-2">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={onClose}
            label={t('cancel')}
          />
          <Button
            type="button"
            color="danger"
            disabled={isLoading}
            onClick={(e) => {
              onDelete(e);
              onClose();
            }}
            label={t('delete.label')}
          />
        </div>
      </Container>
    </Modal>
  );
};
