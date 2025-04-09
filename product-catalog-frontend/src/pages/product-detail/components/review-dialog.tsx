import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, Fragment, useRef } from 'react';
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form';
import { SelectElement, TextareaAutosizeElement } from 'react-hook-form-mui';
import * as yup from 'yup';

interface ReviewDialogProps {
  id?: string;
  className?: string;
  open: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: (
    reset: UseFormReset<{
      comment: string;
      rating: number;
    }>,
  ) => SubmitHandler<{ comment: string; rating: number }>;
  disabled?: boolean;
}

const validationSchema = yup
  .object({
    comment: yup.string().max(255).required(),
    rating: yup.number().min(1).max(5).required(),
  })
  .required();

export const ReviewDialog: FC<ReviewDialogProps> = ({
  id,
  className,
  open,
  onClose,
  onSubmit,
  disabled = false,
}) => {
  const { control, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const formSubmitBtnRef = useRef<HTMLInputElement>(null);

  return (
    <Fragment>
      <Dialog id={id} className={className} maxWidth="sm" open={open}>
        <DialogTitle>Write your review</DialogTitle>

        <DialogContent>
          <DialogContentText className={'mb-5!'}>
            Please help us to serve you better by providing us feedback
          </DialogContentText>

          <form onSubmit={handleSubmit(onSubmit(reset))} noValidate>
            <Stack spacing={2}>
              <SelectElement
                label="Rating"
                size="small"
                name="rating"
                control={control}
                required
                options={new Array(5).fill(1).map((_, index) => {
                  const idxBasedOne = index + 1;

                  return { id: idxBasedOne, label: `${idxBasedOne} ⭐` };
                })}
              />

              <TextareaAutosizeElement
                name="comment"
                control={control}
                helperText="Write your review here"
                required
                minRows={3}
                maxRows={5}
              />

              <input
                ref={formSubmitBtnRef}
                style={{ display: 'none' }}
                type="submit"
              />
            </Stack>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            disabled={disabled}
            onClick={(e) => {
              if (onClose) {
                onClose(e);
              }
            }}
            autoFocus
          >
            Close
          </Button>

          <Button
            loading={disabled}
            loadingIndicator="Loading…"
            onClick={() => {
              formSubmitBtnRef.current?.click();
            }}
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
