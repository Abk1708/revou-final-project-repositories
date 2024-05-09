import Dash_nav from "../components/Dashboard nav/Dash_nav"

interface LayoutProps {
    children:React.ReactNode
}

const DashboardLayout = ({children}:LayoutProps) => {
  return (
    <div>
    <div className="flex flex-row py-4 px-4 h-screen w-screen">
        <Dash_nav />
        <div className="pl-[10px] h-full w-full">
            {children}
        </div>
    </div>
</div>
  )
}

export default DashboardLayout