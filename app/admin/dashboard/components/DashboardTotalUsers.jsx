import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@mui/joy";
import { UsersIcon } from "lucide-react";

const DashboardTotalUsers = async () => {
  let data;
  let totalUsers;

  try {
    const response = await fetch("http://localhost:5000/api/users/");
    data = await response.json();
    totalUsers = data.users.length;
  } catch (error) {
    console.error(error);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        <UsersIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          +{new Intl.NumberFormat("en-US").format(totalUsers)}
        </div>
        <p className="text-xs text-muted-foreground">+2 since last hour</p>
      </CardContent>
    </Card>
  );
};

export default DashboardTotalUsers;
