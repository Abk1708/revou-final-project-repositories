import Navigation from "../components/Navigation_bar"




interface LayoutProps {
    children: React.ReactNode
}

const MainLayout = ({children}:LayoutProps) => {
return (
    <div>
        <div className="h-screen relative">
            <Navigation />
            <div className="relative">
                {children}
            </div>
        </div>
    </div>
)
}

export default MainLayout