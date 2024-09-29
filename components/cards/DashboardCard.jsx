
const DashboardCard = ({children}) => {
  return (
    <div className='flex-1 bg-white p-4 rounded-lg flex items-center justify-between gap-3 shadow-md'>
        {children}
    </div>
  )
}

export default DashboardCard