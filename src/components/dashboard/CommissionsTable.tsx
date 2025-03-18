"use client"
import React, { useEffect } from "react";
import { Table, Select, Input, Button, Spin, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { fetchCommissionsStart, fetchCommissionsSuccess, fetchCommissionsFailure } from "@/store/features/commissionsSlice";
import { RootState } from "@/store/store";
import { format } from "date-fns";

const statusOptions = ["PENDING", "ACCEPTED", "REJECTED", "COMPLETED"];

const CommissionsTable: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading, error, totalRecords, currentPage } = useSelector((state: RootState) => state.commissions);

    const [searchClient, setSearchClient] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
    const pageSize = 10;

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchCommissionsStart());

            try {
                const res = await fetch(`/api/commissions/list?page=${currentPage}&pageSize=${pageSize}`);
                const result = await res.json();

                if (res.ok) {
                    dispatch(fetchCommissionsSuccess({
                        data: result.data,
                        totalRecords: result.totalRecords,
                        currentPage: result.currentPage,
                    }));
                } else {
                    dispatch(fetchCommissionsFailure("Failed to load commissions"));
                }
            } catch (err) {
                dispatch(fetchCommissionsFailure("An error occurred"));
            }
        };

        fetchData();
    }, [dispatch, currentPage]);

    // Filtered data based on search and status filter
    const filteredData = data.filter((item: { user_name: string; status: string; }) => {
        return (
            item.user_name.toLowerCase().includes(searchClient.toLowerCase()) &&
            (statusFilter ? item.status === statusFilter : true)
        );
    });

    const handleStatusChange = async (id: string, newStatus: string) => {
        // Update the status in the backend (you can call your API here)
        await fetch(`/api/commissions/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus }),
            headers: { "Content-Type": "application/json" },
        });

        // After updating the status, refetch commissions
        dispatch(fetchCommissionsStart());
        const res = await fetch(`/api/commissions/list?page=${currentPage}&pageSize=${pageSize}`);
        const result = await res.json();
        if (res.ok) {
            dispatch(fetchCommissionsSuccess({
                data: result.data,
                totalRecords: result.totalRecords,
                currentPage: result.currentPage,
            }));
        } else {
            dispatch(fetchCommissionsFailure("Failed to load commissions"));
        }
    };

    const columns: ColumnsType<typeof data[number]> = [
        {
            title: "Client Name",
            dataIndex: "user_name",
            key: "user_name",
        },
        {
            title: "Client Email",
            dataIndex: "user_email",
            key: "user_email",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <span>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <Select
                    value={status}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    options={statusOptions.map((status) => ({ value: status, label: status }))}
                />
            ),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (createdAt) => format(new Date(createdAt), "MMM dd, yyyy HH:mm:ss"),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', gap: '8px' }}>
                <Input
                    placeholder="Search by client name"
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                />
                <Select
                    placeholder="Filter by status"
                    allowClear
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions.map((status) => ({ value: status, label: status }))}
                />
                <Button onClick={() => dispatch(fetchCommissionsStart())}>Refresh</Button>
            </div>

            {loading ? (
                <Spin tip="Loading..." />
            ) : error ? (
                <Alert message={error} type="error" />
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize,
                        total: totalRecords,
                        onChange: (page) => dispatch(fetchCommissionsStart()), // Update currentPage in Redux state here
                    }}
                />
            )}
        </div>
    );
};

export default CommissionsTable;
