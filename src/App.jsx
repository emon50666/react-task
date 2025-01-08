import CustomTable from "./CustomTable";
import TShirtDesigne from "./TShirtDesigne";




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

      {/* T-Shirt Logo Designer */}
      <section>
        <h2 className="text-xl font-semibold mb-3">T-Shirt Logo Designer</h2>
        <TShirtDesigne />
      </section>
    </div>
  );
};

export default App;
