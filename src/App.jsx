import CustomTable from "./CustomTable";
import TShirtDesign from "./TShirtDesign";





const App = () => {
  return (
    <div className="p-5">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-5 text-center">Home Page</h1>

      {/* Custom Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Custom Table</h2>
        <CustomTable />
      </section>

      {/* T-Shirt Logo Designe */}
      <section>
        <TShirtDesign />
      </section>
    </div>
  );
};

export default App;
