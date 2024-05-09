import { Button, Input, Modal, TextArea } from '@/components/common';
import { validate } from '@/utils/validation';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createMedicalCertificate } from '../../actions/consultation';
import { formatBirthDateToAge } from '@/utils/formatter';

type ModalMedicalCertProps = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
  notify: (url: string) => void;
  patientBirthDate: string;
};

const ModalMedicalCert = ({
  onShowModal,
  showModal,
  notify,
  patientBirthDate,
}: ModalMedicalCertProps) => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({
    'end-date': '',
    diagnosis: '',
  });

  const endDatePicker = useRef<HTMLInputElement>(null);
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const diagnosisRef = useRef<HTMLTextAreaElement>(null);

  const handleDate = (target: HTMLInputElement) => {
    setEndDate(target.value);
    handleInput('end-date', target.value);
  };

  const handleInput = (id: string, value: string) => {
    const errs = errors;

    if (value == '') {
      errs[id] = `${id.replace('-', ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    errs[id] = validate(value, id);

    setErrors({ ...errs });
  };

  const invalidSubmission = () => {
    return Object.values(errors).some((err) => err !== '');
  };

  const anyEmptyField = () => {
    return diagnosisRef.current?.value === '' || endDate === '';
  };

  const handleSubmit = async () => {
    if (invalidSubmission() || anyEmptyField()) {
      const allErrors = Object.fromEntries(
        Object.keys(errors).map((i) => {
          const err: Record<string, string> = {
            diagnosis:
              diagnosisRef.current?.value == ''
                ? 'diagnosis cannot be empty'
                : errors['diagnosis'],
            'end-date':
              endDate == '' ? 'end date cannot be empty' : errors['end-date'],
          };
          return [i, err[i]];
        })
      );
      setErrors({ ...allErrors });
      return;
    }

    const certReq = {
      start_date: new Date().toISOString().split('T')[0],
      end_date: endDate,
      diagnosis: diagnosisRef.current?.value,
      patient_age: formatBirthDateToAge(patientBirthDate),
    };

    setIsLoading(true);
    try {
      const certUrl = await createMedicalCertificate(certReq, `${id}`);
      notify(certUrl.certificate_url);
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
  };

  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between border-b border-gray-light font-poppins font-semibold text-sm px-4 py-4 md:text-lg">
        Create Medical Certificate{' '}
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-5 pb-5 md:min-w-[500px]">
        <div>
          <form
            action={handleSubmit}
            className="text-start flex flex-col pt-5 gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
          >
            <label htmlFor="diagnosis" className="w-full">
              <h5 className="text-start">Diagnosis</h5>
              <TextArea
                ref={diagnosisRef}
                id="diagnosis"
                name="diagnosis"
                message={errors['diagnosis']}
                invalid={errors['diagnosis'] !== ''}
                onInput={({ target }) =>
                  handleInput(
                    'diagnosis',
                    (target as HTMLTextAreaElement).value
                  )
                }
              />
            </label>
            <div className="flex gap-4 text-start items-center">
              <label htmlFor="start-date" className="w-full">
                <h5 className="text-start">Rest Recommendation</h5>
                <Input
                  id="start-date"
                  disabled
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </label>
              <h5 className="mt-5">until</h5>
              <label htmlFor="end-date" className="w-full">
                <h5 className="text-start invisible">Rest Recommendation</h5>
                <Input
                  ref={endDatePicker}
                  min={new Date().toISOString().split('T')[0]}
                  id="end-date"
                  name="end-date"
                  placeholder="Enter your birth date ..."
                  append="Calendar"
                  type="date"
                  valueMode={endDate}
                  onInput={({ target }) =>
                    handleDate(target as HTMLInputElement)
                  }
                  message={errors['end-date']}
                  invalid={errors['end-date'] !== ''}
                  onAppend={() => {
                    endDatePicker.current?.focus();
                    endDatePicker.current?.showPicker();
                  }}
                />
              </label>
            </div>
            <div className="flex justify-end gap-5 items-center mb-2">
              <Button
                className="text-sm flex items-center py-3 justify-center gap-1 px-6 mt-3 w-full min-h-[44px] md:min-w-[150px] md:w-fit"
                onClick={handleSubmit}
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMedicalCert;
