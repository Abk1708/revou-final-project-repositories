import Navigation from "../components/Navigation_bar"
import Footer from "../components/Footer/Footer"




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
            <Footer />
        </div>
    </div>
)
}

export default MainLayout