import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import Sidebar from "components/Sidebar/Sidebar";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/Servicesheader";
import FooterAdmin from "components/Footers/FooterAdmin";
import Donation from "components/Cards/Donation.js";



export default function Dashboard() {
  return (
    <>
    <Sidebar/>
    <div className="relative md:ml-64 bg-white ">
  <HeaderStats/>
    
      <div className="flex flex-wrap">
      <AdminNavbar/>
        
    
      </div>
      <div className="flex flex-wrap mt-4">
      
       
      {/* Service1 */}
     
     <Donation/>
      </div>
      <FooterAdmin/>
      </div>
    </>
  );
}
