import { useState } from "react";
import type { Order } from "../types";

const ITEMS_PER_PAGE = 5;

interface Props {
    orders: Order[];
}

export default function OrderList({
    orders
}: Props) {
    const [page, setPage] = useState(1);
    const totalPages = Math.max(
        1,
        Math.ceil(orders.length / ITEMS_PER_PAGE)
    );
    const currentPage = Math.min(page, totalPages);
    const visibleOrders = orders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-[0_8px_30px_rgba(39,70,47,0.05)] sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c806f]">Aktivitas terbaru</p>
                    <h2 className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#173b27]">Daftar Order</h2>
                </div>
                <span className="rounded-full bg-[#fff1e6] px-3 py-1 text-xs font-bold text-[#b9662e]">{orders.length} order</span>
            </div>

            {orders.length === 0 && (
                <p className="rounded-xl border border-dashed border-[#cbd8cc] px-4 py-8 text-center text-sm text-[#6c806f]">Belum ada order.</p>
            )}

            <div className="space-y-3">
                {visibleOrders.map(order => (
                    <div key={order.id} className="rounded-xl border border-[#e7eee7] bg-[#fbfcfa] p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#173b27]">Rp {order.total_price.toLocaleString("id-ID")}</h3>
                                <p className="mt-1 text-xs text-[#849487]">{new Date(order.created_at).toLocaleString("id-ID")}</p>
                            </div>
                            <span className="rounded-md bg-[#dff0e1] px-2 py-1 text-xs font-bold text-[#28643b]">Selesai</span>
                        </div>
                        <ul className="mt-4 space-y-2 border-t border-[#e7eee7] pt-3">
                            {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between gap-4 text-sm text-[#526456]">
                                    <span>{item.name}</span>
                                    <span className="font-semibold text-[#173b27]">× {item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {orders.length > ITEMS_PER_PAGE && (
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
        </div>
    );
}