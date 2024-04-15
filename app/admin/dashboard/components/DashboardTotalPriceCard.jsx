import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@mui/joy";
import { DollarSignIcon, PoundSterlingIcon } from "lucide-react";
import React from "react";

const DashboardTotalPriceCard = async () => {
  let data;
  let totalPrice;

  try {
    const response = await fetch("http://localhost:5000/api/bookings/");
    data = await response.json();
    totalPrice = data.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.totalAmount;
    }, 0);
  } catch (error) {
    console.error(error);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data ? (
          <>
            <div className="text-2xl font-bold">
              £{new Intl.NumberFormat("en-US").format(totalPrice)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </>
        ) : (
          <CircularProgress color="neutral" variant="soft" size="sm" />
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardTotalPriceCard;
