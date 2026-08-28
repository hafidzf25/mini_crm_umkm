import {
    useEffect,
    useState,
    type FormEvent
} from "react";

import type { Customer } from "../types";
import {
    createOrder
} from "../services/api";

interface Props {
    customers: Customer[];
    onSuccess: () => void;
}

interface OrderDraft {
    customerId: string;
    itemName: string;
    quantity: number;
    price: string;
}

const ORDER_DRAFT_KEY = "mini-crm-order-draft";

function loadOrderDraft(): OrderDraft {
    try {
        const savedDraft = localStorage.getItem(
            ORDER_DRAFT_KEY
        );

        if (savedDraft) {
            return {
                ...{
                    customerId: "",
                    itemName: "",
                    quantity: 1,
                    price: ""
                },
                ...JSON.parse(savedDraft)
            };
        }
    } catch {
        return {
            customerId: "",
            itemName: "",
            quantity: 1,
            price: ""
        };
    }

    return {
        customerId: "",
        itemName: "",
        quantity: 1,
        price: ""
    };
}

export default function OrderForm({
    customers,
    onSuccess
}: Props) {
    const [customerId, setCustomerId] =
        useState(() => loadOrderDraft().customerId);

    const [itemName, setItemName] =
        useState(() => loadOrderDraft().itemName);

    const [quantity, setQuantity] =
        useState(() => loadOrderDraft().quantity);

    const [price, setPrice] =
        useState(() => loadOrderDraft().price);

    useEffect(() => {
        localStorage.setItem(
            ORDER_DRAFT_KEY,
            JSON.stringify({
                customerId,
                itemName,
                quantity,
                price
            })
        );
    }, [customerId, itemName, quantity, price]);

    async function handleSubmit(
        event: FormEvent
    ) {
        event.preventDefault();

        if (!customerId) {
            alert("Pilih customer terlebih dahulu");
            return;
        }

        try {
            await createOrder({
                customer_id: customerId,

                items: [
                    {
                        name: itemName,
                        quantity,
                        price: Number(price || 0)
                    }
                ],

                total_price: quantity * Number(price || 0)
            });

            setItemName("");
            setQuantity(1);
            setPrice("");
            localStorage.removeItem(ORDER_DRAFT_KEY);

            onSuccess();

            alert("Order berhasil ditambahkan");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Terjadi kesalahan"
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-[#dce5dc] border-t-4 border-t-[#3b9b55] bg-white p-5 shadow-[0_8px_30px_rgba(39,70,47,0.05)] sm:p-6">
            <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3b9b55]">Transaksi</p>
                    <h2 className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#173b27]">Tambah Order</h2>
                    <p className="mt-2 text-xs font-normal text-[#849487]">Draft tersimpan otomatis</p>
                </div>
                <span className="text-2xl" aria-hidden="true">↗</span>
            </div>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#526456]">
                Customer
                <select
                    value={customerId}
                    onChange={event => setCustomerId(event.target.value)}
                    required
                    className="rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none transition focus:border-[#3b9b55] focus:ring-2 focus:ring-[#dff0e1]"
                >
                    <option value="">Pilih customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#526456]">
                Nama menu
                <input
                    type="text"
                    placeholder="Contoh: Nasi goreng spesial"
                    value={itemName}
                    onChange={event => setItemName(event.target.value)}
                    required
                    className="rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none transition placeholder:text-[#9aaa9d] focus:border-[#3b9b55] focus:ring-2 focus:ring-[#dff0e1]"
                />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#526456]">
                Jumlah
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={event => setQuantity(Number(event.target.value))}
                    className="rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none transition focus:border-[#3b9b55] focus:ring-2 focus:ring-[#dff0e1]"
                />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#526456]">
                Harga satuan
                <span className="flex items-center overflow-hidden rounded-xl border border-[#dce5dc] bg-[#f8faf7] transition focus-within:border-[#3b9b55] focus-within:ring-2 focus-within:ring-[#dff0e1]">
                    <span className="border-r border-[#dce5dc] px-4 py-3 text-sm font-bold text-[#6c806f]">Rp</span>
                    <input
                        type="number"
                        min="1"
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                        placeholder="0"
                        required
                        className="min-w-0 flex-1 bg-transparent px-4 py-3 font-normal outline-none"
                    />
                </span>
            </label>

            <p className="rounded-xl bg-[#edf6ee] px-4 py-3 text-sm font-semibold text-[#28643b]">
                Total estimasi <span className="float-right font-['Space_Grotesk'] text-lg font-bold">Rp {(quantity * Number(price || 0)).toLocaleString("id-ID")}</span>
            </p>

            <button type="submit" className="mt-2 rounded-xl bg-[#173b27] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#28643b] focus:outline-none focus:ring-2 focus:ring-[#b8d4bd]">
                Simpan Order
            </button>
        </form>
    );
}