import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsPraying, faUsers } from "@fortawesome/free-solid-svg-icons";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-orange-500 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  
                  statTitle="Mukh Darshan"
               
                  statIconName="fas fa-eye"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                 
                  statIconName="fas fa-shoe-prints"
                  statTitle="Paduka Darshan"
                
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  
                  statTitle="Namdev Payri "
              
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 ">
                <CardStats
                  
                  statTitle="Pundlik Mandir "
                 
                  statIconName="fas fa-place-of-worship"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
