import { Button } from '@/components/common';

const UserList = () => {
  return (
    <div>
      <div className="bg-light rounded-xl px-9 py-6">
        <div className="flex items-center justify-between">
          <h1 className="font-poppins font-semibold text-3xl text-dark">
            User List
          </h1>
          <Button>+ Create User</Button>
        </div>
        <table className="w-full border border-gray-lighter rounded-tl-md rounded-tr-md text-left">
          <thead className="bg-gray-soft rounded-tl-md rounded-tr-md">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialist</th>
              <th>Consultation Fee</th>
              <th>Year of Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vivin</td>
              <td>vivin@gmail.com</td>
              <td>Anak</td>
              <td>Rp150.000</td>
              <td>10 years</td>
              <td>Verified</td>
              <td>Action</td>
            </tr>
            <tr>
              <td>Vivin</td>
              <td>vivin@gmail.com</td>
              <td>Anak</td>
              <td>Rp150.000</td>
              <td>10 years</td>
              <td>Verified</td>
              <td>Action</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
