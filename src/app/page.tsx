"use client";

import BranchSelector from "@/components/BranchSelector";
import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { ArecaData, Product, DailyData } from "@/types/arecaData";
import DateNavigator from "@/components/DateNavigator";
import ProductPriceTable from "@/components/ProductPriceTable";
import PriceTrendChart from "@/components/PriceTrendChart";

const ArecaDashboard: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState("SHIMOGA");
  const [data, setData] = useState<ArecaData>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/arecaData?branch=${selectedBranch}`);
      if (!response.ok) {
        setLoading(false);
        setError("Failed to fetch data");
        return;
      }

      const jsonData = await response.json();
      setData(jsonData);
      const latestIndex = jsonData.length - 1;
      setSelectedProducts(
        jsonData[latestIndex]?.products.map((p: Product) => p.name) || []
      );
      setCurrentIndex(latestIndex);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (direction: "prev" | "next") => {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
    }
  };

  const toggleProductSelection = (productName: string) => {
    setSelectedProducts((prev: string[]) =>
      prev.includes(productName)
        ? prev.filter((p) => p !== productName)
        : [...prev, productName]
    );
  };

  const formatChartData = () => {
    return data.map((entry: DailyData) => ({
      date: entry.date,
      ...entry.products.reduce(
        (acc: Record<string, number>, product: Product) => {
          if (selectedProducts.includes(product.name)) {
            acc[product.name] = product.modelRate;
          }
          return acc;
        },
        {}
      ),
    }));
  };

  return (
    <div className="container mt-3">
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <BranchSelector
            selectedBranch={selectedBranch}
            onBranchChange={setSelectedBranch}
          />
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <Button
            variant="primary"
            onClick={fetchData}
            disabled={loading}
            className="w-100 w-md-auto"
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Loading...</span>
              </>
            ) : (
              "Fetch Data"
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && data.length > 0 && (
        <>
          <DateNavigator
            currentDate={data[currentIndex]?.date || ""}
            onDateChange={handleDateChange}
            isPreviousDisabled={currentIndex === 0}
            isNextDisabled={currentIndex === data.length - 1}
          />
          <ProductPriceTable
            products={data[currentIndex].products}
            selectedProducts={selectedProducts}
            onProductSelect={toggleProductSelection}
          />
          <PriceTrendChart
            data={formatChartData()}
            selectedProducts={selectedProducts}
          />
        </>
      )}
    </div>
  );
};

export default ArecaDashboard;
