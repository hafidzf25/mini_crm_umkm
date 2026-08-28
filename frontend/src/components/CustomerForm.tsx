import {
    useState,
    type FormEvent
} from "react";

import {
    createCustomer
} from "../services/api";

interface Props {
    onSuccess: () => void;
}

export default function CustomerForm({
    onSuccess
}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    async function handleSubmit(
        event: FormEvent
    ) {
        event.preventDefault();

        if (!name.trim()) {
            alert("Nama customer wajib diisi.");
            return;
        }

        if (name.trim().length < 2) {
            alert("Nama customer minimal 2 karakter.");
            return;
        }

        if (!email.trim()) {
            alert("Email customer wajib diisi.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Masukkan alamat email yang valid.");
            return;
        }

        if (!phone.trim()) {
            alert("Nomor telepon wajib diisi.");
            return;
        }

        if (!/^\d+$/.test(phone)) {
            alert("Nomor telepon hanya boleh berisi angka.");
            return;
        }

        if (phone.length < 8) {
            alert("Nomor telepon minimal 8 digit.");
            return;
        }

        try {
            await createCustomer({
                name,
                email,
                phone
            });

            setName("");
            setEmail("");
            setPhone("");

            onSuccess();

            alert("Customer berhasil ditambahkan");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Terjadi kesalahan"
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-[#dce5dc] border-t-4 border-t-[#e58f4c] bg-white p-5 shadow-[0_8px_30px_rgba(39,70,47,0.05)] sm:p-6">
            <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e58f4c]">Data baru</p>
                    <h2 className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#173b27]">Tambah Customer</h2>
                </div>
                <span className="text-2xl" aria-hidden="true">＋</span>
            </div>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#526456]">
                Nama customer
                <input
                    type="text"
                    placeholder="Contoh: Abdullah Hafidz"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required
                    className="rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none transition placeholder:text-[#9aaa9d] focus:border-[#3b9b55] focus:ring-2 focus:ring-[#dff0e1]"
                />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#526456]">
                Email
                <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                    className="rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none transition placeholder:text-[#9aaa9d] focus:border-[#3b9b55] focus:ring-2 focus:ring-[#dff0e1]"
                />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#526456]">
                Nomor telepon
                <input
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                    required
                    className="rounded-xl border border-[#dce5dc] bg-[#f8faf7] px-4 py-3 font-normal outline-none transition placeholder:text-[#9aaa9d] focus:border-[#3b9b55] focus:ring-2 focus:ring-[#dff0e1]"
                />
            </label>

            <button type="submit" className="mt-2 rounded-xl bg-[#e58f4c] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#cf7939] focus:outline-none focus:ring-2 focus:ring-[#f3c29c]">
                Simpan Customer
            </button>
        </form>
    );
}