import React from "react";

// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative md:pt-32 pb-32 pt-12 bg-orange-500">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <a href="/services">
                  <CardStats
                    statTitle="Sweets Shops"
                    statIconName="fas fa-store"
                    statIconColor="bg-red-500"
                  />
                </a>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <a href="/booking">
                  <CardStats
                    statTitle="Stay Booking"
                    statIconName="fas fa-hotel"
                    statIconColor="bg-orange-500"
                  />
                </a>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <a href="/essential">
                  <CardStats
                    statTitle="Essential Things"
                    statIconName="fas fa-shopping-bag"
                    statIconColor="bg-pink-500"
                  />
                </a>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <a href="/testing">
                  <CardStats
                    statTitle="Donation"
                    statIconName="fas fa-donate"
                    statIconColor="bg-lightBlue-500"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
