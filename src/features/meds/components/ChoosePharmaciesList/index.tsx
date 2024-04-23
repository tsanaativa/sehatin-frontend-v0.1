import Badge from '@/components/common/Badge';
import { MapPin } from 'lucide-react';

const ChoosePharmaciesList = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((item, idx) => (
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
              <span>Century Plaza Senayan</span>
              <Badge>Selected</Badge>
            </div>
            <div className="flex justify-between gap-x-4 px-4 py-2">
              <MapPin className="text-dark-gray" />
              <div className=" flex flex-col">
                <span className="font-medium text-xs text-dark-gray">
                  Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616
                </span>
                <span className="font-medium text-xs text-secondary mt-4">
                  10 km from your location
                </span>
                <span className="font-medium text-xs text-dark-gray">
                  Available shipping methods: Official Instant, Official Same
                  Day
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
