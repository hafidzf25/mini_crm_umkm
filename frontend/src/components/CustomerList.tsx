import { useState } from "react";
import type { Customer } from "../types";

const ITEMS_PER_PAGE = 5;

interface Props {
    customers: Customer[];
    selectedCustomer: string;
    onSelect: (id: string) => void;
}

export default function CustomerList({
    customers,
    selectedCustomer,
    onSelect
}: Props) {
    const [page, setPage] = useState(1);
    const totalPages = Math.max(
        1,
        Math.ceil(customers.length / ITEMS_PER_PAGE)
    );
    const currentPage = Math.min(page, totalPages);
    const visibleCustomers = customers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-[0_8px_30px_rgba(39,70,47,0.05)] sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c806f]">Database</p>
                    <h2 className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#173b27]">Daftar Customer</h2>
                </div>
                <span className="rounded-full bg-[#f0f5ef] px-3 py-1 text-xs font-bold text-[#6c806f]">{customers.length} orang</span>
            </div>

            {customers.length === 0 && (
                <p className="rounded-xl border border-dashed border-[#cbd8cc] px-4 py-8 text-center text-sm text-[#6c806f]">Belum ada customer.</p>
            )}

            <div className="space-y-3">
                {visibleCustomers.map(customer => (
                    <div key={customer.id} className={`rounded-xl border p-4 transition ${selectedCustomer === customer.id ? "border-[#3b9b55] bg-[#edf6ee]" : "border-[#e7eee7] bg-[#fbfcfa] hover:border-[#b8d4bd]"}`}>
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="truncate font-semibold text-[#173b27]">{customer.name}</h3>
                                <p className="mt-1 truncate text-sm text-[#6c806f]">{customer.email}</p>
                                <p className="mt-1 text-xs text-[#849487]">{customer.phone}</p>
                            </div>
                            <button
                                className="shrink-0 rounded-lg border border-[#b8d4bd] px-3 py-2 text-xs font-bold text-[#28643b] transition hover:bg-[#dff0e1] focus:outline-none focus:ring-2 focus:ring-[#b8d4bd]"
                                onClick={() => onSelect(customer.id)}
                            >
                                {selectedCustomer === customer.id ? "Terpilih" : "Lihat order"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {customers.length > ITEMS_PER_PAGE && (
                <div className="mt-5 flex items-center justify-between border-t border-[#e7eee7] pt-4">
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setPage(currentPage - 1)}
                        className="rounded-lg border border-[#dce5dc] px-3 py-2 text-xs font-bold text-[#526456] transition hover:border-[#3b9b55] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        ← Sebelumnya
                    </button>
                    <span className="text-xs font-semibold text-[#849487]">Halaman {currentPage} dari {totalPages}</span>
                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => setPage(currentPage + 1)}
                        className="rounded-lg border border-[#dce5dc] px-3 py-2 text-xs font-bold text-[#526456] transition hover:border-[#3b9b55] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Berikutnya →
                    </button>
                </div>
            )}

            {selectedCustomer && (
                <button
                    className="mt-4 w-full rounded-xl border border-[#dce5dc] px-4 py-3 text-sm font-bold text-[#6c806f] transition hover:border-[#173b27] hover:text-[#173b27] focus:outline-none focus:ring-2 focus:ring-[#b8d4bd]"
                    onClick={() => onSelect("")}
                >
                    ← Tampilkan Semua Order
                </button>
            )}
        </div>
    );
}