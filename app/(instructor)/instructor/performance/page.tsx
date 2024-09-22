import { getPerformance } from "@/app/actions/getPerformance"
import Chart from "@/components/performance/Chart"
import DataCard from "@/components/performance/DataCard"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const PerformancePage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const { data, totalRevenue, totalSales } = await getPerformance(userId)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-8 mb-4">
        {/* First row with DataCard and text */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Wrapper for the card to apply size adjustments */}
          <div className="w-full md:w-1/3">
            <DataCard value={totalRevenue} label="Course Revenue" shouldFormat />
          </div>
          <p className="text-sm md:w-1/2">
            This shows the total revenue generated from the courses sold by the mentor. Tracking this metric helps to understand the overall financial success of the courses and how well they are performing in terms of sales.
          </p>
        </div>

        {/* Second row with DataCard and text */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-full md:w-1/3">
            <DataCard value={totalSales} label="Courses Sold" />
          </div>
          <p className="text-sm md:w-1/2">
            This shows the total number of courses sold by the mentor. Monitoring course sales helps to gauge the demand for the content and provides insights into how well the mentor's offerings are resonating with students.
          </p>
        </div>

        {/* Chart */}
        <div>
          <Chart data={data} />
        </div>
      </div>
    </div>
  )
}

export default PerformancePage
