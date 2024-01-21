import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({children}:{
    children:React.ReactNode
}) => {
    return ( 
    <div className="h-full">
        <div
            className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50"
        >
            <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar />
        </div>
        {/* on md devices our sidebar has width 56 so we give children padd from left of 56 to make them visible and also navbar has ht 80 so give padding top 80px*/}
        <main className="md:pl-56 pt-[80px] h-full" >
            {children}
        </main>      
    </div>
    );
}
 
export default DashboardLayout;