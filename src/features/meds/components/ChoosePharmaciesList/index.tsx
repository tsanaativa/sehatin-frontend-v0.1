import Badge from '@/components/common/Badge';
import { DUMMY_CHOOSE_PHARMACIES } from '@/constants/dummy';
import { MapPin } from 'lucide-react';

const ChoosePharmaciesList = () => {
  return (
    <>
      {DUMMY_CHOOSE_PHARMACIES.map((item, idx) => (
        <div key={idx} className="border border-primary-border rounded-lg">
          <input
            type="radio"
            name=""
            id={`pharmacy-${idx}`}
            className={`peer/pharmacy-${idx}`}
            hidden
          />
          <label htmlFor={`pharmacy-${idx}`}>
            <div className="flex items-center justify-between border-b border-primary-border px-4 py-2">
              <span>{item.name}</span>
              {item.status ? <Badge>Selected</Badge> : null}
            </div>
            <div className="flex justify-between gap-x-4 px-4 py-2">
              <MapPin className="text-dark-gray" />
              <div className=" flex flex-col">
                <span className="font-medium text-xs text-dark-gray">
                  {item.address}
                </span>
                <span className="font-medium text-xs text-secondary mt-4">
                  {item.distance} from your location
                </span>
                <span className="font-medium text-xs text-dark-gray">
                  Available shipping methods: {item.shipping}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-primary-border px-4 py-2">
              <span className="font-medium text-xs text-dark">Item Price:</span>
              <span className="font-semibold text-xs text-secondary">
                Rp 15.990
              </span>
            </div>
          </label>
        </div>
      ))}
    </>
  );
};

export default ChoosePharmaciesList;
