import axios from 'axios'
import React, { useEffect, useState } from 'react'

const dummyHospitalData = [
  { id: 1, name: "서울 동물병원", description: "서울의 대표적인 동물병원입니다." },
  { id: 2, name: "강남 동물병원", description: "강남에 위치한 믿을 수 있는 동물병원입니다." },
  { id: 3, name: "홍대 동물병원", description: "홍대 인근에 위치한 동물병원입니다." },
  { id: 4, name: "삼성동물병원", description: "서울 삼성동에 위치한 전문 동물병원입니다." },
  { id: 5, name: "역삼동 동물병원", description: "역삼동에 있는 동물병원으로 최신 장비를 갖추고 있습니다." },
  { id: 6, name: "명동 동물병원", description: "서울 명동에 있는 신뢰도 높은 동물병원입니다." },
]

const Hospital = () => {
  const [hospitalData, setHospitalData] = useState<any[]>([]) // hospital 데이터를 상태로 저장

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  // 페이지네이션에 맞는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = dummyHospitalData.slice(indexOfFirstItem, indexOfLastItem)

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'http://openapi.seoul.go.kr:8088/70554d6e6e6861723932456779696a/xml/LOCALDATA_020301/1/5/'
  //       )

  //       const hospitalList = response.data.LOCALDATA_020301.row.map((hospital: any) => ({
  //         id: hospital.CTPRVN_NM + hospital.BSNS_TELNO,
  //         name: hospital.HOSP_NM,
  //         description: hospital.HOSP_ADDR,
  //       }))
  //       setHospitalData(hospitalList)
  //     } catch (error) {
  //       console.error('데이터를 가져오는 중 오류가 발생했습니다:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])


  return (
    <div className="flex flex-col h-full items-center justify-center p-6 bg-green-50 rounded-lg shadow-lg">
      <div className="text-2xl font-semibold text-blue-600 mb-4">동물병원 목록</div>
      <ul className="w-full space-y-4">
        {currentItems.map((hospital) => (
          <li key={hospital.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-700">{hospital.name}</h3>
            <p className="text-gray-700">{hospital.description}</p>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex gap-4 mt-6">
        {Array.from({ length: Math.ceil(dummyHospitalData.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Hospital
