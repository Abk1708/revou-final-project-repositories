import Navigation from "../components/Navigation_bar"
import HeroSection from "../components/section/Hero_section"



interface LayoutProps {
    children: React.ReactNode
}

const MainLayout = ({children}:LayoutProps) => {
return (
    <div>
        <div className="h-screen relative">
            <Navigation />
            <HeroSection/>
            <div className="relative">
                {children}
            </div>
        </div>
    </div>
)
}

export default MainLayout