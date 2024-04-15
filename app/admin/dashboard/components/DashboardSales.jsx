import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@mui/joy";
import { CreditCardIcon } from "lucide-react";

const DashboardSales = async () => {
  let data;
  let totalSales;

  try {
    const response = await fetch("http://localhost:5000/api/bookings/");
    data = await response.json();
    totalSales = data.length;
  } catch (error) {
    console.error(error);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data ? (
          <>
            <div className="text-2xl font-bold">
              +{new Intl.NumberFormat("en-US").format(totalSales)}
            </div>
            <p className="text-xs text-muted-foreground">
              +100% from last month
            </p>
          </>
        ) : (
          <CircularProgress color="neutral" variant="soft" size="sm" />
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardSales;
