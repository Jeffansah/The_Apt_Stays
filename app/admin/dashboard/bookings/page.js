import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircularProgress } from "@mui/joy";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { format } from "date-fns";

const Booking = async () => {
  let data;

  try {
    const response = await fetch("http://localhost:5000/api/bookings/");
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
      {/* <Card className="">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Bookings</CardTitle>
            <CardDescription>View and Manage your bookings.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stay</TableHead>
                <TableHead className="hidden md:table-cell">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Rooms</TableHead>
                <TableHead className="hidden md:table-cell">Nights</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                data.map((transac) => (
                  <TableRow>
                    <TableCell>{transac.stay.stayName}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {transac.user.userFirstName} {transac.user.userLastName}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {transac.user.userEmail}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transac.rooms}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transac.nights}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(transac.createdAt), "dd MMM yy")}
                    </TableCell>
                    <TableCell className="text-right">
                      £{transac.totalAmount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <CircularProgress color="neutral" variant="soft" size="sm" />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Booking;
