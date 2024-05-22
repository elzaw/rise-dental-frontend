import instance from "@/axios/instance";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface Patient {
  _id: string;
  name: string;
  phone: string;
  address: string;
}

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await instance.get("/patients");
      console.log("API Response:", response.data);
      setPatients(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to only run once

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default behavior of the link
    event.stopPropagation(); // Prevent navigation when clicking the delete button
    try {
      await instance.delete(`/patients/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
      console.log("Patient deleted successfully");
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div className="p-16 w-full">
      <h2 className="text-2xl font-bold mb-4 text-right">ابحث عن مريض</h2>
      <input
        type="search"
        placeholder="اكتب اسم المريض"
        value={searchQuery}
        onChange={handleSearch}
        className="rounded border-gray-300 focus:border-blue-500 ring  focus:ring  focus:ring-blue-200 focus:ring-opacity-50 w-full p-2 text-end"
      />
      <h2 className="text-4xl font-bold mb-4 text-right mt-10">المرضى</h2>
      <div className="grid grid-cols-1 gap-10 ">
        {filteredPatients.map((patient, index) => (
          <Link
            to={`/patient/${patient._id}`}
            key={index}
            className="text-gray-900 dark:text-gray-50"
          >
            <div className="bg-white dark:bg-gray-950 rounded shadow-lg p-6 mt-5 cursor-pointer mb-5 ">
              <h2 className="text-2xl font-bold mb-4 text-right">
                معلومات الاتصال
              </h2>
              <div className="grid lg:grid-cols-1 grid-cols-1  gap-10 ">
                <div className="flex flex-col items-end justify-center  ">
                  <div className="flex items-center justify-end">
                    <span className="text-gray-900 dark:text-gray-50 font-medium mr-2 my-2">
                      {patient?.name}
                    </span>
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-gray-900 dark:text-gray-50 mr-2 my-2">
                      {patient?.address}
                    </span>
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-gray-900 dark:text-gray-50 mr-2 my-2">
                      {patient?.phone}
                    </span>
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  className="text-red-500 bg-transparent border border-red-500 px-10 py-3 rounded hover:bg-red-500 hover:text-white"
                  onClick={(e) => handleDelete(patient._id, e)}
                >
                  حذف
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
