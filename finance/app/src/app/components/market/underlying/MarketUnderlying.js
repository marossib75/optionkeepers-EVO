import React from "react";
import { capitalizeFirst } from "react-stockcharts/lib/utils";

const MarketUnderlying = ({ tab, underlying }) => (
  <div className="p-4">
    <div className="mb-2">
      <h2 className="text-2xl font-semibold">{tab.label}</h2>
      <div className="text-sm text-gray-600">
        {tab.exchange} · {capitalizeFirst(tab.template)}
      </div>
    </div>

    <div className="text-sm mt-2 leading-relaxed">
      <div className="flex gap-6">
        <span><strong>Last:</strong> {underlying.price}</span>
        <span><strong>Open:</strong> {underlying.open}</span>
        <span><strong>Close:</strong> {underlying.close}</span>
        <span><strong>High:</strong> {underlying.high}</span>
        <span><strong>Low:</strong> {underlying.low}</span>
      </div>
    </div>
  </div>
);

export default MarketUnderlying;

