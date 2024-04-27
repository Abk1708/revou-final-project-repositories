import Navigation from "../components/Navigation_bar"



interface LayoutProps {
    children: React.ReactNode
}

const MainLayout = ({children}:LayoutProps) => {
  return (
  <div>
    <div className="flex flex-col h-screen">
        <Navigation />
        <div className="flex-1">
            {children}
        </div>
    </div>
  </div>
  )
}

export default MainLayout