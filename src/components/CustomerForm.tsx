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
    name: "",
    gender: "",
    age: "",
    address: "",
    mobile: "",
    frameName: "",
    framePrice: "",
    lensName: "",
    lensPrice: "",
    lensWarranty: "",
    discount: "",
    advancePaid: "",
  });

  const [prescription, setPrescription] = useState({
    dvRe: { sph: "", cyl: "", axis: "" },
    dvLe: { sph: "", cyl: "", axis: "" },
    nvRe: { sph: "", cyl: "", axis: "" },
    nvLe: { sph: "", cyl: "", axis: "" },
  });

  const calculateTotal = () => {
    const framePrice = parseFloat(customerData.framePrice) || 0;
    const lensPrice = parseFloat(customerData.lensPrice) || 0;
    return framePrice + lensPrice;
  };

  const calculateBalance = () => {
    const total = calculateTotal();
    const discount = parseFloat(customerData.discount) || 0;
    const advance = parseFloat(customerData.advancePaid) || 0;
    return total - discount - advance;
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter customer name"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="frameName">Frame Name</Label>
              <Input
                id="frameName"
                value={customerData.frameName}
                onChange={(e) => handleInputChange("frameName", e.target.value)}
                placeholder="Enter frame name"
              />
            </div>
            <div>
              <Label htmlFor="framePrice">Frame Price (₹)</Label>
              <Input
                id="framePrice"
                type="number"
                value={customerData.framePrice}
                onChange={(e) => handleInputChange("framePrice", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="lensName">Lens Name</Label>
              <Input
                id="lensName"
                value={customerData.lensName}
                onChange={(e) => handleInputChange("lensName", e.target.value)}
                placeholder="Enter lens name"
              />
            </div>
            <div>
              <Label htmlFor="lensPrice">Lens Price (₹)</Label>
              <Input
                id="lensPrice"
                type="number"
                value={customerData.lensPrice}
                onChange={(e) => handleInputChange("lensPrice", e.target.value)}
                placeholder="0.00"
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
          </div>

          {/* Prescription Table */}
          <PrescriptionTable prescription={prescription} setPrescription={setPrescription} />

          {/* Total Calculation */}
          <div className="mt-6 bg-optical-light p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="advancePaid">Advance Paid (₹)</Label>
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
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-optical-dark">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-optical-dark">
                  <span>Balance:</span>
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