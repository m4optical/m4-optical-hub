import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Search, Printer } from "lucide-react";
import PrescriptionTable from "./PrescriptionTable";
import { useToast } from "@/hooks/use-toast";

const CustomerForm = () => {
  const { toast } = useToast();
  const [customerData, setCustomerData] = useState({
    customerId: `C${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    name: "",
    nameOfFH: "", // Father/Husband
    gender: "",
    age: "",
    address: "",
    mobile: "",
    frameName1: "",
    framePrice1: "",
    frameName2: "",
    framePrice2: "",
    lensName1: "",
    lensPrice1: "",
    lensName2: "",
    lensPrice2: "",
    ipd: "", // Interpupillary Distance
    lensWarranty: "",
    frameManufacturingWarranty: "",
    discount: "",
    less: "",
    advancePaid: "",
    due: "",
    revPayment: "",
    balance: "",
    revDate: "",
  });

  const [prescription, setPrescription] = useState({
    dvRe: { sph: "", cyl: "", axis: "" },
    dvLe: { sph: "", cyl: "", axis: "" },
    nvRe: { sph: "", cyl: "", axis: "" },
    nvLe: { sph: "", cyl: "", axis: "" },
  });

  const calculateTotal = () => {
    const framePrice1 = parseFloat(customerData.framePrice1) || 0;
    const framePrice2 = parseFloat(customerData.framePrice2) || 0;
    const lensPrice1 = parseFloat(customerData.lensPrice1) || 0;
    const lensPrice2 = parseFloat(customerData.lensPrice2) || 0;
    return framePrice1 + framePrice2 + lensPrice1 + lensPrice2;
  };

  const calculateBalance = () => {
    const total = calculateTotal();
    const discount = parseFloat(customerData.discount) || 0;
    const less = parseFloat(customerData.less) || 0;
    const advance = parseFloat(customerData.advancePaid) || 0;
    const revPayment = parseFloat(customerData.revPayment) || 0;
    return total - discount - less - advance - revPayment;
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!customerData.name || !customerData.mobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and mobile number.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Customer Saved",
      description: "Customer record has been saved successfully.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Customer Details */}
      <Card className="shadow-medium">
        <CardHeader className="bg-optical-light">
          <CardTitle className="text-optical-dark">Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="customerId">Customer ID</Label>
              <Input
                id="customerId"
                value={customerData.customerId}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={customerData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="nameOfFH">Name of F/H</Label>
              <Input
                id="nameOfFH"
                value={customerData.nameOfFH}
                onChange={(e) => handleInputChange("nameOfFH", e.target.value)}
                placeholder="Father/Husband name"
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={customerData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="Enter age"
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                value={customerData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="Enter mobile number"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={customerData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter address"
                className="min-h-[80px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="shadow-medium">
        <CardHeader className="bg-optical-light">
          <CardTitle className="text-optical-dark">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Frame Details */}
            <div>
              <Label htmlFor="frameName1">Frame Name 1</Label>
              <Input
                id="frameName1"
                value={customerData.frameName1}
                onChange={(e) => handleInputChange("frameName1", e.target.value)}
                placeholder="Enter frame name 1"
              />
            </div>
            <div>
              <Label htmlFor="framePrice1">Frame Price 1 (₹)</Label>
              <Input
                id="framePrice1"
                type="number"
                value={customerData.framePrice1}
                onChange={(e) => handleInputChange("framePrice1", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="frameName2">Frame Name 2</Label>
              <Input
                id="frameName2"
                value={customerData.frameName2}
                onChange={(e) => handleInputChange("frameName2", e.target.value)}
                placeholder="Enter frame name 2"
              />
            </div>
            <div>
              <Label htmlFor="framePrice2">Frame Price 2 (₹)</Label>
              <Input
                id="framePrice2"
                type="number"
                value={customerData.framePrice2}
                onChange={(e) => handleInputChange("framePrice2", e.target.value)}
                placeholder="0.00"
              />
            </div>

            {/* Lens Details */}
            <div>
              <Label htmlFor="lensName1">Lens Name 1</Label>
              <Input
                id="lensName1"
                value={customerData.lensName1}
                onChange={(e) => handleInputChange("lensName1", e.target.value)}
                placeholder="Enter lens name 1"
              />
            </div>
            <div>
              <Label htmlFor="lensPrice1">Lens Price 1 (₹)</Label>
              <Input
                id="lensPrice1"
                type="number"
                value={customerData.lensPrice1}
                onChange={(e) => handleInputChange("lensPrice1", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="lensName2">Lens Name 2</Label>
              <Input
                id="lensName2"
                value={customerData.lensName2}
                onChange={(e) => handleInputChange("lensName2", e.target.value)}
                placeholder="Enter lens name 2"
              />
            </div>
            <div>
              <Label htmlFor="lensPrice2">Lens Price 2 (₹)</Label>
              <Input
                id="lensPrice2"
                type="number"
                value={customerData.lensPrice2}
                onChange={(e) => handleInputChange("lensPrice2", e.target.value)}
                placeholder="0.00"
              />
            </div>

            {/* Additional Details */}
            <div>
              <Label htmlFor="ipd">IPD</Label>
              <Input
                id="ipd"
                value={customerData.ipd}
                onChange={(e) => handleInputChange("ipd", e.target.value)}
                placeholder="Interpupillary Distance"
              />
            </div>
            <div>
              <Label htmlFor="lensWarranty">Lens Warranty</Label>
              <Select onValueChange={(value) => handleInputChange("lensWarranty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select warranty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="none">No Warranty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frameManufacturingWarranty">Frame Manufacturing Warranty</Label>
              <Select onValueChange={(value) => handleInputChange("frameManufacturingWarranty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select warranty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="03months">03 Months</SelectItem>
                  <SelectItem value="06months">06 Months</SelectItem>
                  <SelectItem value="12months">12 Months</SelectItem>
                  <SelectItem value="24months">24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="revDate">REV. Date</Label>
              <Input
                id="revDate"
                type="date"
                value={customerData.revDate}
                onChange={(e) => handleInputChange("revDate", e.target.value)}
              />
            </div>
          </div>

          {/* Prescription Table */}
          <PrescriptionTable prescription={prescription} setPrescription={setPrescription} />

          {/* Payment Calculation */}
          <div className="mt-6 bg-optical-light p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="discount">Discount (₹)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={customerData.discount}
                    onChange={(e) => handleInputChange("discount", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="less">Less (₹)</Label>
                  <Input
                    id="less"
                    type="number"
                    value={customerData.less}
                    onChange={(e) => handleInputChange("less", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="advancePaid">ADV - Advance Paid (₹)</Label>
                  <Input
                    id="advancePaid"
                    type="number"
                    value={customerData.advancePaid}
                    onChange={(e) => handleInputChange("advancePaid", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="due">DEU - Due (₹)</Label>
                  <Input
                    id="due"
                    type="number"
                    value={customerData.due}
                    onChange={(e) => handleInputChange("due", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="revPayment">REV. Payment (₹)</Label>
                  <Input
                    id="revPayment"
                    type="number"
                    value={customerData.revPayment}
                    onChange={(e) => handleInputChange("revPayment", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="balance">BAL - Balance (₹)</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={customerData.balance}
                    onChange={(e) => handleInputChange("balance", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-lg font-semibold p-3 bg-white rounded">
                  <span>Total Amount:</span>
                  <span className="text-optical-dark">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-optical-dark p-3 bg-white rounded border-2 border-optical-blue">
                  <span>Calculated Balance:</span>
                  <span>₹{calculateBalance().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={handleSave} className="bg-gradient-primary shadow-soft">
          <Save className="mr-2 h-4 w-4" />
          Save Entry
        </Button>
        <Button variant="outline" className="border-optical-blue text-optical-blue hover:bg-optical-blue hover:text-white">
          <Search className="mr-2 h-4 w-4" />
          Search Customer
        </Button>
        <Button onClick={handlePrint} variant="secondary" className="shadow-soft">
          <Printer className="mr-2 h-4 w-4" />
          Print Invoice
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;