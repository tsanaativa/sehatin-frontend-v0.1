import Input from '../Input';

const AddressLoading = () => {
  return (
    <>
      <label htmlFor="province">
        <h5>Province</h5>
        <Input id="province" name="province" disabled value="Loading..." />
      </label>
      <label htmlFor="city">
        <h5>City</h5>
        <Input id="city" name="city" disabled value="Loading..." />
      </label>
      <label htmlFor="district">
        <h5>District</h5>
        <Input id="district" name="district" disabled value="Loading..." />
      </label>
      <label htmlFor="subdistrict">
        <h5>Sub District</h5>
        <Input
          id="subdistrict"
          name="subdistrict"
          disabled
          value="Loading..."
        />
      </label>
      <label>
        <h5>Postal Code</h5>
        <input
          disabled
          defaultValue="Loading..."
          className={`px-[14px] outline-none border border-gray-light w-full text-primary-text
                   bg-gray-light cursor-not-allowed rounded-xl py-3 h-fit`}
        />
      </label>
      <label className="mb-5">
        <h5>Address</h5>
        <textarea
          className={`px-[14px] outline-none border border-gray-light bg-gray-light w-full h-full text-primary-text leading-[150%]
                   cursor-not-allowed min-h-[100px] py-3 rounded-xl`}
          defaultValue="Loading..."
          disabled
        ></textarea>
      </label>
    </>
  );
};

export default AddressLoading;
