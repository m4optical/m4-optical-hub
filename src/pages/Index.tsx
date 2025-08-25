import OpticalHeader from "@/components/OpticalHeader";
import CustomerForm from "@/components/CustomerForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-light">
      <OpticalHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-optical-dark mb-2">Customer Management System</h2>
          <p className="text-muted-foreground">Enter customer details and manage optical prescriptions</p>
        </div>
        <CustomerForm />
      </main>
    </div>
  );
};

export default Index;
