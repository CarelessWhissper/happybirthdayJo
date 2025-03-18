import DashboardLayout from "../layout";
import CommissionsTable from "@/components/dashboard/CommissionsTable";

export default function CommissionsPage() {
    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ marginBottom: '16px' }}>Commissions Management</h1>
            <CommissionsTable />
        </div>
    );
}