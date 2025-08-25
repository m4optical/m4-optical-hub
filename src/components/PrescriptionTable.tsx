import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PrescriptionData {
  sph: string;
  cyl: string;
  axis: string;
}

interface PrescriptionTableProps {
  prescription: {
    dvRe: PrescriptionData;
    dvLe: PrescriptionData;
    nvRe: PrescriptionData;
    nvLe: PrescriptionData;
  };
  setPrescription: (prescription: any) => void;
}

const PrescriptionTable = ({ prescription, setPrescription }: PrescriptionTableProps) => {
  const handlePrescriptionChange = (eye: string, field: string, value: string) => {
    setPrescription((prev: any) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-optical-dark">Prescription Details</Label>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border rounded-lg">
          <thead>
            <tr className="bg-optical-light">
              <th className="border border-border p-3 text-left font-semibold">Eye</th>
              <th className="border border-border p-3 text-center font-semibold">SPH</th>
              <th className="border border-border p-3 text-center font-semibold">CYL</th>
              <th className="border border-border p-3 text-center font-semibold">AXIS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 font-medium bg-muted">DV RE (Right Eye - Distance)</td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.dvRe.sph}
                  onChange={(e) => handlePrescriptionChange("dvRe", "sph", e.target.value)}
                  placeholder="SPH"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.dvRe.cyl}
                  onChange={(e) => handlePrescriptionChange("dvRe", "cyl", e.target.value)}
                  placeholder="CYL"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.dvRe.axis}
                  onChange={(e) => handlePrescriptionChange("dvRe", "axis", e.target.value)}
                  placeholder="AXIS"
                  className="text-center"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-medium bg-muted">DV LE (Left Eye - Distance)</td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.dvLe.sph}
                  onChange={(e) => handlePrescriptionChange("dvLe", "sph", e.target.value)}
                  placeholder="SPH"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.dvLe.cyl}
                  onChange={(e) => handlePrescriptionChange("dvLe", "cyl", e.target.value)}
                  placeholder="CYL"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.dvLe.axis}
                  onChange={(e) => handlePrescriptionChange("dvLe", "axis", e.target.value)}
                  placeholder="AXIS"
                  className="text-center"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-medium bg-muted">NV RE (Right Eye - Near)</td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.nvRe.sph}
                  onChange={(e) => handlePrescriptionChange("nvRe", "sph", e.target.value)}
                  placeholder="SPH"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.nvRe.cyl}
                  onChange={(e) => handlePrescriptionChange("nvRe", "cyl", e.target.value)}
                  placeholder="CYL"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.nvRe.axis}
                  onChange={(e) => handlePrescriptionChange("nvRe", "axis", e.target.value)}
                  placeholder="AXIS"
                  className="text-center"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-medium bg-muted">NV LE (Left Eye - Near)</td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.nvLe.sph}
                  onChange={(e) => handlePrescriptionChange("nvLe", "sph", e.target.value)}
                  placeholder="SPH"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.nvLe.cyl}
                  onChange={(e) => handlePrescriptionChange("nvLe", "cyl", e.target.value)}
                  placeholder="CYL"
                  className="text-center"
                />
              </td>
              <td className="border border-border p-2">
                <Input
                  value={prescription.nvLe.axis}
                  onChange={(e) => handlePrescriptionChange("nvLe", "axis", e.target.value)}
                  placeholder="AXIS"
                  className="text-center"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="text-sm text-muted-foreground">
        <strong>Note:</strong> SPH (Sphere), CYL (Cylinder), AXIS - Enter prescription values as provided by optometrist
      </p>
    </div>
  );
};

export default PrescriptionTable;