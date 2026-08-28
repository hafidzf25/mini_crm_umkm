import {
  startTransition,
  useEffect,
  useState
} from "react";

import {
  getCustomers,
  getOrders
} from "./services/api";

import type {
  Customer,
  Order
} from "./types";

import CustomerForm
  from "./components/CustomerForm";

import OrderForm
  from "./components/OrderForm";

import CustomerList
  from "./components/CustomerList";

import OrderList
  from "./components/OrderList";

function App() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [
    selectedCustomer,
    setSelectedCustomer
  ] = useState("");

  async function loadCustomers() {
    try {
      const data = await getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadOrders(
    customerId?: string
  ) {
    try {
      const data = await getOrders(
        customerId
      );

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function refresh() {
    await loadCustomers();

    await loadOrders(
      selectedCustomer || undefined
    );
  }

  useEffect(() => {
    startTransition(() => {
      void loadCustomers();
      void loadOrders();
    });
  }, []);

  async function handleCustomerSelect(
    id: string
  ) {
    setSelectedCustomer(id);

    await loadOrders(
      id || undefined
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8f4] px-4 py-6 text-[#17221b] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-5 border-b border-[#dce5dc] pb-7 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[#173b27] sm:text-4xl">Mini CRM UMKM Kuliner</h1>
            <p className="mt-2 max-w-xl text-sm text-[#6c806f]">Kelola customer dan pesanan harian dalam satu ruang kerja yang sederhana.</p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full bg-[#dff0e1] px-3 py-2 text-xs font-bold text-[#28643b] sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-[#3b9b55]" /> Mini CRM
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-[0_8px_30px_rgba(39,70,47,0.05)]">
            <p className="text-sm text-[#6c806f]">Total customer</p>
            <p className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-[#173b27]">{customers.length}</p>
          </div>
          <div className="rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-[0_8px_30px_rgba(39,70,47,0.05)]">
            <p className="text-sm text-[#6c806f]">Order ditampilkan</p>
            <p className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-[#173b27]">{orders.length}</p>
          </div>
          <div className="rounded-2xl bg-[#173b27] p-5 text-white shadow-[0_8px_30px_rgba(23,59,39,0.14)]">
            <p className="text-sm text-[#b8d4bd]">Mode tampilan</p>
            <p className="mt-2 font-['Space_Grotesk'] text-xl font-bold">{selectedCustomer ? "Customer terpilih" : "Semua order"}</p>
          </div>
        </section>

        <section className="mb-10 grid gap-5 lg:grid-cols-2">
        <CustomerForm
          onSuccess={refresh}
        />

        <OrderForm
          customers={customers}
          onSuccess={refresh}
        />
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <CustomerList
          customers={customers}
          selectedCustomer={
            selectedCustomer
          }
          onSelect={
            handleCustomerSelect
          }
        />

        <OrderList
          key={selectedCustomer}
          orders={orders}
        />
        </section>
      </div>
    </main>
  );
}

export default App;