"use client";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
interface School {
  addresses: Address[];
  affiliation: string[];
  creator: string;
  educationServiceArea: string;
  email: string;
  gradeLevelIsActive: {
    grade1: boolean;
    grade2: boolean;
    grade3: boolean;
    grade4: boolean;
    grade5: boolean;
    grade6: boolean;
    grade7: boolean;
    grade8: boolean;
    grade9: boolean;
    grade10: boolean;
    grade11: boolean;
    grade12: boolean;
  };
  isActive: boolean;
  lastModifiedBy: string;
  name: {
    englist: string;
    thai: string;
  };
  schoolCode: string;
  schoolDirector: { name: string };
  updateAt: number;
  website: string;
}

interface Address {
  address: string;
  country: string;
  district: string;
  geoCode: string;
  geoPoint: {
    _latitude: string;
    _longitude: string;
  };
  province: string;
  region: string;
  road: string;
  subDistrict: string;
  zipPost: string;
}

export default function Home() {
  const [schoolList, setSchoolList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/school");
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.status}`);
        }
        const { data } = await res.json();

        setSchoolList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const scroll = () => {
    console.log("dwdwd");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pageCount = Math.ceil(schoolList.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const renderSchoolList = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return schoolList.slice(startIndex, endIndex).map((school, index) => (
      <div
        key={index}
        className="w-[600px] bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          {school.name.english}
        </h2>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          {school.name.thai}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="font-bold">Email:</div>
            <div className="text-gray-700">{school.email}</div>
          </div>
          <div>
            <div className="font-bold">Website:</div>
            <div className="text-gray-700 overflow-hidden">
              {school.website}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-6">
          <div>
            <div className="font-bold">Country:</div>
            <div className="text-gray-700">{school.addresses[0].country}</div>
          </div>
          <div>
            <div className="font-bold">Province:</div>
            <div className="text-gray-700">{school.addresses[0].province}</div>
          </div>
          <div>
            <div className="font-bold">Road:</div>
            <div className="text-gray-700">
              {school.addresses[0].road ? school.addresses[0].road : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">District:</div>
            <div className="text-gray-700">{school.addresses[0].district}</div>
          </div>
          <div>
            <div className="font-bold">Region:</div>
            <div className="text-gray-700">{school.addresses[0].region}</div>
          </div>
          <div>
            <div className="font-bold">Sub District:</div>
            <div className="text-gray-700">
              {school.addresses[0].subDistrict}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="font-bold">Grade Active:</div>
          <div>
            {Object.keys(school.gradeLevelIsActive)
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map((grade) => (
                <div key={grade} className="text-gray-700">
                  Grade {grade}:{" "}
                  {school.gradeLevelIsActive[grade] ? "True" : "False"}
                </div>
              ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          School Data
        </h1>

        {renderSchoolList()}

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex justify-center gap-10"}
          activeClassName={"active text-blue-700 font-bold"}
          previousClassName={
            "pagination__link bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
          }
          nextClassName={
            "pagination__link bg-gray-200 text-gray-700 px-4 py-2 rounded-md ml-2"
          }
          disabledClassName={
            "pagination__link bg-gray-200 text-gray-400 px-4 py-2 rounded-md mr-2 ml-2 cursor-not-allowed"
          }
          onClick={scroll}
        />
      </div>
    </div>
  );
}
