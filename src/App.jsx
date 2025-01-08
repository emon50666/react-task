import CustomTable from "./CustomTable";
import TShirtDesign from "./TShirtDesign";





const App = () => {
  return (
    <div className="p-5">
      {/* Custom Table */}
      <section className="mb-10">
        <CustomTable />
      </section>

      {/* T-Shirt Logo Design */}
      <section>
        <TShirtDesign />
      </section>
    </div>
  );
};

export default App;
