import { Glasses } from "lucide-react";

const OpticalHeader = () => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-strong">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-background/10 p-3 rounded-full">
              <Glasses size={32} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">M4 Opticals</h1>
              <p className="text-primary-foreground/80 text-sm">Professional Eye Care Solutions</p>
            </div>
          </div>
          
          <div className="text-right text-sm">
            <div className="space-y-1">
              <p className="font-medium">📍 123 Vision Street, Optical City</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ info@m4opticals.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OpticalHeader;