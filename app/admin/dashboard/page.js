import React from "react";
import DashboardTotalPriceCard from "./components/DashboardTotalPriceCard";
import DashboardSales from "./components/DashboardSales";
import DashboardTotalUsers from "./components/DashboardTotalUsers";
import DashboardLatestTransactions from "./components/DashboardLatestTransactions";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <DashboardTotalPriceCard />
        <DashboardSales />
        <DashboardTotalUsers />
      </div>
      <DashboardLatestTransactions />
    </main>
  );
};

export default page;
